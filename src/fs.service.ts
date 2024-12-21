import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./intefaces/user.interface";

const pathFile = path.resolve(process.cwd(), "db", "users.json");

export const read = async (): Promise<IUser[]> => {
  try {
    const json = await fs.readFile(pathFile, "utf-8");
    return json ? JSON.parse(json) : [];
  } catch (error: any) {
    console.log("error:", error.message);
    return [];
  }
};
export const write = async (users: IUser[]): Promise<void> => {
  try {
    await fs.writeFile(pathFile, JSON.stringify(users, null, 2));
  } catch (error: any) {
    console.log("error:", error.message);
  }
};
