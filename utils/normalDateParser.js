import { parser } from './parser.js'

export const normalDateParser = (fileName, status) => {
    if (status === 'old') {
        const string = fileName.split('-')

        const date = string[1]

        const year = parser(0, 4, date)
        const month = parser(4, 6, date)
        const day = parser(6, 8, date)
        return { year, month, day }
    }
    if (status === 'new') {
        const splitFileName = fileName.split(' ')

        const date = splitFileName[2].split('-')
        const year = date[0]
        const month = date[1]
        const day = date[2]

        const hourlyTime = splitFileName[4].split('.')
        const hour = hourlyTime[0]
        const minute = hourlyTime[1]
        const second = hourlyTime[2]

        return { year, month, day, hour, minute, second }
    }
    if (status === 'android') {
        const string = fileName.split('_')

        const date = string[1]
        const time = string[2]

        const year = parser(0, 4, date)
        const month = parser(4, 6, date)
        const day = parser(6, 8, date)

        const hour = parser(0, 2, time)
        const minute = parser(2, 4, time)
        const second = parser(4, 6, time)

        return { year, month, day, hour, minute, second }
    }
}
