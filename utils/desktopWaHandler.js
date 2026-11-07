import path from "path";
import { normalDateParser } from "./normalDateParser.js";
import { exiftool } from "exiftool-vendored";

export const desktopWaHandler = async (file) => {
    try {
        const fileName = path.basename(file);
        const date = normalDateParser(fileName, "new");
        const exifDateStr = `${date.year}:${date.month}:${date.day} ${date.hour}:${date.minute}:${date.second}`;
        await exiftool.write(file, {
            DateTimeOriginal: exifDateStr,
            CreateDate: exifDateStr,
        });
        console.log(file);
    } catch (error) {
        console.log(error);
    }
};
