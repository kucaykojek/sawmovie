import dayjs from 'dayjs'
import 'dayjs/locale/id'
import numeral from 'numeral'

export function formatNumber(
  number: any,
  format: string = '0,0',
  allowZero: boolean = false
): string {
  if (!allowZero) {
    if (format.includes('$') && !number) {
      return '-'
    }
  } else if (format.includes('$') && typeof number !== 'number') {
    return '-'
  }

  return numeral(number).format(format)
}

export function formatDate(
  date: any,
  format: string = 'DD/MM/YY HH:mm TZ',
  addDays?: any
): string {
  if (!date) {
    return '-'
  }

  if (format.includes('TZ')) {
    const offset: number = (-1 * new Date(date).getTimezoneOffset()) / 60
    const timezoneIndex: string = `UTC${offset >= 0 ? `+${offset}` : offset}`
    format = format.replace('TZ', timezoneIndex)
  }

  if (addDays) {
    return dayjs(date).add(addDays, 'days').format(format)
  }

  return dayjs(date).format(format)
}

export function truncateString(string: string, n: number = 10) {
  return string.length > n ? string.slice(0, n - 1) + '...' : string
}
