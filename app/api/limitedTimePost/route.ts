import { NextResponse } from "next/server";

import path from "path";

import readDataWithTimeout from "utils/readDataWithTimeout"

interface Post {
  id: string;
  account: string;
  avatar: string;
}

interface Data {
  limitedTimePost: Post[];
}

const dbPath: string = path.join(process.cwd(), "data", "limitedTimePost.json");

export const GET = async () => {
  try {
    const response = (await readDataWithTimeout<Data>(dbPath, 1500)).limitedTimePost
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};