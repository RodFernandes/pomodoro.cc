import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function toISOSubstring (date = new Date()) {
  return dayjs(date).format('YYYY-MM-DD')
}
