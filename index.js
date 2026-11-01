import { exiftool } from "exiftool-vendored";
import { setTimeout } from "node:timers/promises";
import process from "node:process";
import commandLineArgs from "command-line-args";
import { multipleSourceHelper } from "./utils/multipleSourceHelper.js";
import { oldWaHandler } from "./utils/oldWaHandler.js";
import { unixHandler } from "./utils/unixHandler.js";
import { newWaHandler } from "./utils/newWaHandler.js";
import path from "node:path";

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

        for (let i = 0; i < files.length; i++) {
            const element = files[i];
            const fileName = path.basename(element);
            const elementUnix = fileName
                .split(".")[0]
                .split(" ")[0]
                .split("_")[0]
                .split("(")[0];
            const elementFileLength = elementUnix.length;

            if (
                /^\d+$/.test(elementUnix) &&
                elementFileLength === 13 ||
                elementFileLength === 10
            ) {
              console.log("unix mode");
               await unixHandler(element);
            }
            
            else if (
                fileName.split(" ")[0] === "WhatsApp" &&
                fileName.split(" ")[1]
            ) {
                console.log("new whatsapp mode");
                await newWaHandler(element);
            }
            else if (
                fileName.split("-")[0] === "IMG" &&
                fileName.split("-")[1].length === 8
            ) {
              console.log("old whatsapp mode");
                await oldWaHandler(element);
            } else {
              console.log("file has been skipped NO MATCHING CRITERIA")
            }
        }

        // if (args.whatsapp) {
        //   await parsedHandler(files)
        // } else {
        //   await unixHandler(files)
        // }

        console.log("success");
    } catch (error) {
        console.log(error);
    } finally {
        await exiftool.end();
    }
}

unixParser();
