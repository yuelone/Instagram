import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface SuggestedItem {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  isFollowing: boolean;
}

interface SuggestedData {
  suggested: SuggestedItem[];
}

interface FollowingItem {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  isFollowing: boolean;
}

interface FollowingData {
  following: FollowingItem[];
}

const getDbPath = (type: string): string => {
  if (process.env.VERCEL_ENV) {
    return path.join("/tmp", `${type}.json`);
  } else {
    return path.join(process.cwd(), "data", `${type}.json`);
  }
};


const readData = <T>(type: string): T => {
  const filePath = getDbPath(type);
  if (!fs.existsSync(filePath)) {
    throw new Error(`The data file ${type}.json does not exist`);
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
};

const writeData = <T>(type: string, data: T): void => {
  const filePath = getDbPath(type);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

const createSuggestedRecord = (
  record: FollowingItem,
  isFollowing: boolean
): SuggestedItem => ({
  id: record.id,
  avatar: record.avatar,
  account: record.account,
  verify: record.verify,
  subtitle: "",
  isFollowing,
});

export const PATCH = async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const { id } = await props.params;
  const { type } = await request.json() as { type: "suggested" | "following" };

  try {
    const suggestedData = readData("suggested") as SuggestedData;
    const followingData = readData("following") as FollowingData;

    let suggestedRecord = suggestedData.suggested.find(item => item.id === id);
    const followingRecord = followingData.following.find(item => item.id === id);

    let newState: boolean;

    // If found in Suggested, switch the state directly
    // If it is not found in Suggested, but is found in Following, then create a Suggested record based on Following.

    // If found in Following, switch state
    // Synchronously update the status in Suggested, and add a new one if it does not exist
    switch (type) {
      case "suggested":
        if (suggestedRecord) {
          newState = !suggestedRecord.isFollowing;
          suggestedRecord.isFollowing = newState;
        } else if (followingRecord) {
          newState = !followingRecord.isFollowing;
          suggestedRecord = createSuggestedRecord(followingRecord, newState);
          suggestedData.suggested.push(suggestedRecord);
        } else {
          return NextResponse.json(
            { message: "The data could not be found" },
            { status: 404 }
          );
        }
        break;

      case "following":
        if (followingRecord) {
          newState = !followingRecord.isFollowing;
          followingRecord.isFollowing = newState;
          if (suggestedRecord) {
            suggestedRecord.isFollowing = newState;
          } else {
            suggestedRecord = createSuggestedRecord(followingRecord, newState);
            suggestedData.suggested.push(suggestedRecord);
          }
        } else {
          return NextResponse.json(
            { message: "The data cannot be found in Following" },
            { status: 404 }
          );
        }
        break;

      default:
        return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    // Update the Following list synchronously according to the new tracking status
    if (newState) {
      // When the tracking status is true, ensure that the following contains the data.
      if (!followingRecord && suggestedRecord) {
        followingData.following.push({
          id: suggestedRecord.id,
          avatar: suggestedRecord.avatar,
          account: suggestedRecord.account,
          verify: suggestedRecord.verify,
          isFollowing: true,
        });
      } else if (followingRecord) {
        followingRecord.isFollowing = true;
      }
    } else {
      // When you cancel tracking, remove the record from the Following list.
      followingData.following = followingData.following.filter(item => item.id !== id);
    }

    writeData("suggested", suggestedData);
    writeData("following", followingData);

    return NextResponse.json({ id, type, isFollowing: newState });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
};
