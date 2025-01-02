import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Suggested {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  isFollowing: boolean
};

interface Data {
  suggested: Suggested[];
}

const dbPath: string = path.join(process.cwd(), "data", "suggested.json");

const readData = (): Data => {
  const fileContent = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(fileContent) as Data;
};

export const GET = async () => {
  try {
    const data = await new Promise<Data>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 1000);

      try {
        const result = readData();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        clearTimeout(timeout);
      }
    });

    return NextResponse.json(data.suggested);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};