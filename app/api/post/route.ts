import { NextResponse } from "next/server";

import path from "path";

import readDataWithTimeout from "utils/readDataWithTimeout"

interface Post {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  photos: string[];
  likes: number;
  description: string;
  hashTags: string[];
  createTime: string;
};

interface Data {
  post: Post[];
}

const dbPath: string = path.join(process.cwd(), "data", "post.json");

export const GET = async () => {
  try {
    const response = (await readDataWithTimeout<Data>(dbPath, 2000)).post
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};
