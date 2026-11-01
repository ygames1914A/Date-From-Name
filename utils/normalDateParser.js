import path from "path";

export const normalDateParser = (fileName, status) => {
    if (status === "old") {
        const string = fileName.split("-");

        const date = string[1];
        function parser(start, end) {
            let data = [];
            for (let i = start; i < end; i++) {
                // console.log(date[i])
                data.push(date[i]);
            }
            return data.join("");
        }

        const year = parser(0, 4);
        const month = parser(4, 6);
        const day = parser(6, 8);
        return { year, month, day };
    }
    if (status === "new") {
        const splitFileName = fileName.split(" ");

        const date = splitFileName[2].split("-");
        const year = date[0];
        const month = date[1];
        const day = date[2];

        const hourlyTime = splitFileName[4].split(".");
        const hour = hourlyTime[0];
        const minute = hourlyTime[1];
        const second = hourlyTime[2];

        return { year, month, day, hour, minute, second };
    }
};
