import fs from "fs/promises";

const readDataWithTimeout = async <T>(filePath: string, timeoutMs: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Request timed out")), timeoutMs);

    fs.readFile(filePath, "utf8")
      .then((fileContent) => {
        clearTimeout(timeout);
        resolve(JSON.parse(fileContent) as T);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

export default readDataWithTimeout;
