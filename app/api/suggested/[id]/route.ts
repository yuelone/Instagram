import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Suggested {
  id: string;
  isFollowing: boolean;
}

interface Data {
  suggested: Suggested[];
}

interface PatchParams {
  id: string;
}

const dbPath: string = path.join(process.cwd(), "data", "suggested.json");

const readData = (): Data => {
  const fileContent = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(fileContent) as Data;
};

const writeData = (data: Data): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};

export const PATCH = async (request: Request, { params }: { params: PatchParams }) => {
  const { id } = await params

  try {
    const currentData = readData();
    const suggestedIndex = currentData.suggested.findIndex((isFollowing) => isFollowing.id === id);

    if (suggestedIndex === -1) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const requestBody = await request.json();

    const updatedSuggested = {
      ...currentData.suggested[suggestedIndex],
      ...requestBody,
      isFollowing: !currentData.suggested[suggestedIndex].isFollowing,
    };

    currentData.suggested[suggestedIndex] = updatedSuggested;

    writeData(currentData);

    const response = {
      id: updatedSuggested.id,
      isFollowing: updatedSuggested.isFollowing
    }

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};
