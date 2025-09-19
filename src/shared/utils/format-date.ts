import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (date: Date | string, format = 'DD/MM/YYYY') => {
  return dayjs(date).format(format)
}

export const formatRelativeTime = (date: Date | string) => {
  return dayjs(date).fromNow()
}

export const formatDateRange = (startDate: Date | string, endDate: Date | string) => {
  const start = dayjs(startDate).format('DD/MM/YYYY')
  const end = dayjs(endDate).format('DD/MM/YYYY')
  return `${start} - ${end}`
}

export const isToday = (date: Date | string) => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const isYesterday = (date: Date | string) => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}
