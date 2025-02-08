import { NextResponse } from "next/server";

import path from "path";

import readDataWithTimeout from "utils/readDataWithTimeout"

interface Following {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  isFollowing: boolean
};

interface Data {
  following: Following[];
}

const dbPath: string = path.join(process.cwd(), "data", "following.json");

export const GET = async () => {
  try {
    const response = (await readDataWithTimeout<Data>(dbPath, 1000)).following
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};