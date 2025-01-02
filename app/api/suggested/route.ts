import { NextResponse } from "next/server";

import path from "path";

import readDataWithTimeout from "utils/readDataWithTimeout"

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

export const GET = async () => {
  try {
    const response = (await readDataWithTimeout<Data>(dbPath, 1000)).suggested
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};