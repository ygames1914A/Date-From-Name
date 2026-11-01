import { exiftool } from "exiftool-vendored";
import { setTimeout } from "node:timers/promises";
import process from "node:process";
import commandLineArgs from "command-line-args";
import { multipleSourceHelper } from "./utils/multipleSourceHelper.js";
import { parsedHandler } from "./utils/parsedHandler.js";
import { unixHandler } from "./utils/unixHandler.js";

//  const directory = "/mnt/new/nepic";

const optionDefinitions = [
  { name: "src", type: String, multiple: true, defaultOption: true },
  { name: "whatsapp", alias: "w", type: Boolean },
];

const args = commandLineArgs(optionDefinitions);

if (!args.src) {
  console.log("src doesn't exist");
  process.exit(1);
}

// const exiftool = new ExifTool({
//     exiftoolPath: "exiftool",
// });

const exifExistanceCheck = async () => {
  const version = exiftool.version();

  await setTimeout(1000);

  if (!version) {
    process.exit(1);
  }
  return version;
};



async function unixParser() {
  try {
    const versionCheckValue = await exifExistanceCheck();
    console.log(versionCheckValue);
    // file = ['/path/to/file1','/path/to/file2']
    const files = await multipleSourceHelper(args);

    if (args.whatsapp) {
      await parsedHandler(files)
    } else {
      await unixHandler(files)
    }

    console.log("success");
  } catch (error) {
    console.log(error);
  } finally {
    await exiftool.end();
  }
}

unixParser();
