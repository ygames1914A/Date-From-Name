import path from 'path'

export const normalDateParser = (fileName) => {
  const string = path.basename(fileName).split("-");
  
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
};
