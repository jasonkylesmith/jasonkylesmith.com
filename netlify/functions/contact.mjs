/* const crypto = require("crypto")
const { google } = require("googleapis")
const validator = require("validator")
const nodemailer = require("nodemailer") */

import crypto from "crypto"
import validator from "validator"
import { google } from "googleapis"
import nodemailer from "nodemailer"

function formatDate(date) {
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

function queryStringToObject(queryString) {
  const params = new URLSearchParams(queryString)
  const obj = {}

  for (const [key, value] of params) {
    obj[key] = value
  }

  return obj
}

function decrypt(data) {
  let iv = Buffer.from(data.iv, "hex")
  let finalKey = Buffer.from(
    JSON.parse(process.env.GATSBY_EXPORTED_KEY).k,
    "base64"
  )

  let encryptedText = Buffer.from(data.encryptedData, "hex")
  let decipher = crypto.createDecipheriv("aes-256-cbc", finalKey, iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

function validateAndSanitizeFormData(data) {
  let sanitizedData = []
  let hasEmail = false

  data.forEach(field => {
    if (validator.isEmail(field)) {
      hasEmail = true
      sanitizedData.push(
        validator.normalizeEmail(validator.trim(field), {
          gmail_remove_subaddress: false,
        })
      )
    } else {
      sanitizedData.push(validator.trim(field))
    }
  })

  return sanitizedData
}

async function sendEmail(data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.com", // Replace with your SMTP host
    port: 587, // Replace with your SMTP port (587 for TLS)
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GATSBY_EMAIL_FROM, // Replace with your IONOS email
      pass: process.env.GATSBY_EMAIL_PASSWORD, // Replace with your IONOS email password
    },
    tls: {
      // Do not fail on invalid certs (if using self-signed certificates)
      rejectUnauthorized: false,
    },
  })

  // Setup email data
  let mailOptions = {
    from: `"JasonKyleSmith.com Contact Alert" <${process.env.GATSBY_EMAIL_FROM}>`, // sender address
    to: process.env.GATSBY_EMAIL_TO, // list of receivers
    subject: "You Have a Website Contact Form Submission!", // Subject line
    text: `${data?.name}, ${data?.email} \n ${data?.timestamp} \n\n ${data?.message} \n\n\n Google Sheet at ${process.env.GATSBY_GOOGLE_SHEET_LINK}`, // plain text body
    html: `<b>${data?.name}</b> (<i>${data?.email}</i>) <br /> <i>${data?.timestamp}</i> <br /><br /> ${data?.message} <br /><br /><br /> Access <a href="${process.env.GATSBY_GOOGLE_SHEET_LINK}" target="_BLANK">Google Sheet</a> `, // html body
  }

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("error with transporter sending mail", error)
    }
  })
}

function parseBody(request) {
  try {
    const symbolKeys = Object.getOwnPropertySymbols(request)

    const stateSymbol = symbolKeys.find(
      sym => sym.toString() === "Symbol(state)"
    )

    const requestState = stateSymbol ? request[stateSymbol] : null

    console.log("requestState", requestState)

    const source = requestState.body.source

    console.log("source", source)

    if (requestState && source) {
      return source
    } else {
      throw "no state symbol"
    }
  } catch (error) {
    console.log("error with parsing source", error)
    return {}
  }
}

export default async function handler(event) {
  console.log("Is this even running?", event)

  const error = { msg: false }
  let body = {}
  let statusCode = 200
  let statusText = ""

  if (event.body) {
    body = queryStringToObject(parseBody(event))
  } else {
    error.msg = "No body was passed"
    error.statusCode = 501
  }

  const decryptedKey = decrypt({ iv: body.iv, encryptedData: body.apiKey })

  if (decryptedKey !== process.env.GATSBY_FUNCTIONS_API_KEY) {
    error.statusCode = 401
    error.msg = "Unauthorized"
  } else {
    // Do the things!
    const { name, email, message, destination, emailPermissionToUse } = body

    try {
      const auth = new google.auth.JWT(
        process.env.GATSBY_GOOGLE_CLIENT_EMAIL,
        null,
        process.env.GATSBY_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets"]
      )

      const sheets = google.sheets({ version: "v4", auth })

      const validatedData = validateAndSanitizeFormData([
        name,
        email,
        destination,
        emailPermissionToUse,
        message,
      ])

      const timestamp = formatDate(new Date())

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GATSBY_GOOGLE_SHEETS_LEAD_SHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[timestamp, ...validatedData]],
        },
      })

      statusCode = response.status
      statusText = response.statusText

      try {
        await sendEmail({ timestamp, ...body })
      } catch (error) {
        console.log("Error sending email", error)
      }
    } catch (error) {
      console.log("Error with google sheet", error)
    }
  }

  if (error.msg) {
    return { statusCode: error.statusCode, body: JSON.stringify({ error }) }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ statusText }),
    }
  }
}
