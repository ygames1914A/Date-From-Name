import path from "node:path";
import { exiftool } from "exiftool-vendored";

export const unixHandler = async (file) => {
    try {
        // for (let i = 0; i < files.length; i++) {
        // files[i] = /path/to/photos
        // path.basename used to get the filename only
        const element = path.basename(file);
        const elemetUnix = element
            .split(".")[0]
            .split(" ")[0]
            .split("_")[0]
            .split("(")[0];
        const elementFileLength = elemetUnix.length;
        const multiPlier = elementFileLength === 13 ? 1 : 1000;
        // console.log(elemetUnix)

        if (!/^\d+$/.test(elemetUnix)) {
            console.log(
                `${element} doesn't have a unix timestamp as it's name`,
            );
            return;
        }

        if (elementFileLength !== 13 && elementFileLength !== 10) {
            console.log(`${element} name length not 13 or 10`);
            return;
        }

        const date = new Date(parseInt(elemetUnix) * multiPlier);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const exifDateStr = `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
        //   console.log(exifDateStr);

        await exiftool.write(file, {
            DateTimeOriginal: exifDateStr,
            CreateDate: exifDateStr,
        });
        //console.log("ExifTool version:", await exiftool.version());
        // console.log(element);
        console.log(file);
        // }
    } catch (error) {
        console.log(error);
    }
};
