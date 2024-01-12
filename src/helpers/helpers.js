export function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get the day, month, and year
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  // Add ordinal suffix to the day
  const ordinalSuffixes = ["th", "st", "nd", "rd"]
  const v = day % 100
  const ordinalSuffix =
    ordinalSuffixes[(v - 20) % 10] || ordinalSuffixes[v] || ordinalSuffixes[0]

  // Get hours and minutes for 12-hour format
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes

  // Combine everything into a formatted string
  return `${month} ${day}${ordinalSuffix}, ${year} ${hours}:${formattedMinutes}${ampm}`
}

export function formatDateForGoogleSheet(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // DST / Offset?
  const isEasternDaylightTime = isInEasternDaylightTime(date)
  const estOffset = isEasternDaylightTime ? -4 : -5

  // Get the day, month, and year
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  // Add ordinal suffix to the day
  const ordinalSuffixes = ["th", "st", "nd", "rd"]
  const v = day % 100
  const ordinalSuffix =
    ordinalSuffixes[(v - 20) % 10] || ordinalSuffixes[v] || ordinalSuffixes[0]

  // Get hours and minutes for 12-hour format, manually adjusted to EST
  let hours = date.getUTCHours() + estOffset

  if (hours < 1) {
    hours = 12 + hours
  }

  /*   console.log("UTCHours", date.getUTCHours())
  console.log("estOffset", estOffset)
  console.log("hours", hours) */

  const minutes = date.getMinutes()

  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes

  // Combine everything into a formatted string
  return `${month} ${day}${ordinalSuffix}, ${year} ${hours}:${formattedMinutes}${ampm}`
}

export function isInEasternDaylightTime(date) {
  // Get year from the provided date
  const year = date.getFullYear()

  // Function to get the Nth day of a specific month and weekday
  function getNthDayOfMonth(nth, day, month, year) {
    let counter = 0
    let date = new Date(year, month, 1)
    while (true) {
      if (date.getDay() === day) {
        counter += 1
        if (counter === nth) {
          return date
        }
      }
      date.setDate(date.getDate() + 1)
    }
  }

  // DST starts on the second Sunday in March
  const dstStart = getNthDayOfMonth(2, 0, 2, year) // 0 is Sunday, 2 is March

  // DST ends on the first Sunday in November
  const dstEnd = getNthDayOfMonth(1, 0, 10, year) // 10 is November

  // Check if current date is within the DST period
  return date >= dstStart && date < dstEnd
}
