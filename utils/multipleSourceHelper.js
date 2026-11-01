import { readdir } from "node:fs/promises";
import path from "node:path";

export async function multipleSourceHelper(args) {
  try {
    const data = await Promise.all(
      args.src.map(async (directory) => {
        const data = await readdir(directory);
        // console.log(await readdir(directory))
        const out = data.map((item) => path.join(directory, item));

        return out;
      }),
    );

    const parsed = data.flat(1);
    return parsed
    // const dataPlusDirectory = path.join(args.src[0],data)
    // console.log(parsed);
    return parsed;
  } catch (error) {
    console.log(error);
  }
}