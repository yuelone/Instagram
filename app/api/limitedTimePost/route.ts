import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

interface Post {
  id: string;
  name: string;
  avatar: string;
}

interface Data {
  limitedTimePost: Post[];
}

const dbPath: string = path.join(process.cwd(), "data", "limitedTimePost.json");

const readData = (): Data => {
  const fileContent = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(fileContent) as Data;
};

const writeData = (data: Data): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};

export const GET = async () => {
  try {
    const data = await new Promise<Data>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 1500);

      try {
        const result = readData();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        clearTimeout(timeout);
      }
    });

    return NextResponse.json(data.limitedTimePost);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, avatar }: { name: string; avatar: string } = await req.json();

    const newPost: Post = {
      id: uuidv4(),
      name,
      avatar,
    };

    await new Promise<Data>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 1500);

      try {
        const currentData = readData();
        currentData.limitedTimePost.push(newPost);
        writeData(currentData);
        resolve(currentData);
      } catch (error) {
        reject(error);
      } finally {
        clearTimeout(timeout);
      }
    });

    return NextResponse.json({ message: "LimitedTimePost added", limitedTimePost: newPost }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await new Promise<Data>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 1500);

      try {
        const currentData = readData();
        currentData.limitedTimePost = currentData.limitedTimePost.filter((post) => post.id !== id);
        writeData(currentData);
        resolve(currentData);
      } catch (error) {
        reject(error);
      } finally {
        clearTimeout(timeout);
      }
    });

    return NextResponse.json({ message: "LimitedTimePost deleted" }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};
