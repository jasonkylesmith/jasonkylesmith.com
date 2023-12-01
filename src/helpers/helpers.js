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
