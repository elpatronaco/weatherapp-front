export const dayNames: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const addDays = (date: Date, amount: number): Date => {
  var tzOff = date.getTimezoneOffset() * 60 * 1000,
    t = date.getTime(),
    d = new Date(),
    tzOff2

  t += 1000 * 60 * 60 * 24 * amount
  d.setTime(t)

  tzOff2 = d.getTimezoneOffset() * 60 * 1000
  if (tzOff !== tzOff2) {
    var diff = tzOff2 - tzOff
    t += diff
    d.setTime(t)
  }

  return d
}
