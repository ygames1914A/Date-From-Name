export function parser(start, end, date) {
    let data = []
    for (let i = start; i < end; i++) {
        // console.log(date[i])
        // it pushes because it's element by element
        data.push(date[i])
    }
    return data.join('')
}
