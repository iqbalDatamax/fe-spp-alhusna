/* document explanation at docs/helpers/formatter.md */
export function formatterCurrency(number) {
  if (!number) return null
  const value = number.toString().replace(/\./g, '')
  return Number(value) > 0 ? value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
}

export function formatterNumber(number) {
  if (!number) return null
  const value = number.toString().replace(/\./g, '')
  return Number(value)
}

export function dateFormatter(type, date) {
  if (!date) {
    return ''
  }
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const dateObject = new Date(date)
  const dateString = `${dateObject.getDate()} ${monthName[dateObject.getMonth()]} ${dateObject.getFullYear()}`
  const timeString = `${dateObject.getHours()}:${(dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes()} ${getTimezone(dateObject.getTimezoneOffset())}`
  if (type === 'time') {
    return `${timeString}`
  } else if (type === 'date') {
    return `${dateString}`
  }
}

export function dateFormatter2(date) {
  if (!date) {
    return ''
  }
  const dateObject = new Date(date)
  return `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`
}

export function getTimezone(offset) {
  const offsetInHour = offset / 60
  switch (offsetInHour) {
    case -7:
      return 'WIB'
    case -8:
      return 'WITA'
    case -9:
      return 'WIT'
    default:
      return 'WIB'
  }
}