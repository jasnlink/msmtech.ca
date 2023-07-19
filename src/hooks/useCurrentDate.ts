import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export default function useCurrentDate() {
    dayjs.extend(utc)
    return dayjs().local().format('YYYY-MM-DD')
}