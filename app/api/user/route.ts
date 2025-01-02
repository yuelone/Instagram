import { NextResponse } from "next/server";

import path from "path";

import readDataWithTimeout from "utils/readDataWithTimeout"

interface User {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
};

interface Data {
  user: User;
}

const dbPath: string = path.join(process.cwd(), "data", "user.json");

export const GET = async () => {
  try {
    const response = await readDataWithTimeout<Data>(dbPath, 1000)
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};