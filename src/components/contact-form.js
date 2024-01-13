import React, { useEffect, useState } from "react"

const ContactForm = ({ module, location }) => {
  const { buttonText, destination: destinationRaw, title } = module

  const SUBJECT_LIST = [
    "I'm interested in booking!",
    "I have a question...",
    "Just here to join your newsletter.",
  ]

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  // blank, invalid, valid
  const [emailState, setEmailState] = useState("blank")
  const [subject, setSubject] = useState(SUBJECT_LIST[0])
  const [join, setJoin] = useState(true)
  const [message, setMessage] = useState("")
  const [honeypotChecked, setHoneypotChecked] = useState(false)
  const [emailPermissionChecked, setEmailPermissionChecked] = useState(true)
  const [emailPermissionToUse, setEmailPermissionToUse] = useState("Yes")
  const [destination, setDestination] = useState(
    destinationRaw ? destinationRaw : ""
  )
  const [error, setError] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (location?.search !== "") {
      const params = new URLSearchParams(location.search)
      const newSubject = params.get("s")

      if (newSubject) {
        switch (newSubject) {
          case "inquiry":
            setSubject(SUBJECT_LIST[0])
            break
          case "question":
            setSubject(SUBJECT_LIST[1])
            break
          case "newsletter":
            setSubject(SUBJECT_LIST[2])
            break
          default:
            setSubject(SUBJECT_LIST[0])
        }
      }
    }
  }, [location])

  async function encryptData(data) {
    // Convert text to ArrayBuffer
    const textEncoder = new TextEncoder()
    const encodedData = textEncoder.encode(data)

    // Generate a random key and IV
    const key = await crypto.subtle.importKey(
      "jwk",
      JSON.parse(process.env.GATSBY_EXPORTED_KEY),
      { name: "AES-CBC", length: 256 },
      true,
      ["encrypt", "decrypt"]
    )

    const iv = crypto.getRandomValues(new Uint8Array(16))

    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      key,
      encodedData
    )

    // Convert ArrayBuffer to hex string for IV and encrypted data
    const ivHex = Array.from(iv)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
    const encryptedHex = Array.from(new Uint8Array(encrypted))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")

    return { iv: ivHex, encryptedData: encryptedHex }
  }

  const formValidation = () => {
    return emailState === "valid" && message.length > 3 && name.length > 2
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setSubject(SUBJECT_LIST[0])
    setJoin(true)
    setEmailState("blank")
    setMessage("")
    setHoneypotChecked(false)
    setEmailPermissionChecked(true)
    setEmailPermissionToUse("Yes")
    setError(false)
    setIsMessageSent(false)
  }

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    regex.test(email) ? setEmailState("valid") : setEmailState("invalid")
  }

  const handleOnChange = (event, input) => {
    const { value } = event.target

    switch (input) {
      case "name":
        setName(value)
        break

      case "email":
        setEmail(value)
        break
      case "subject":
        setSubject(value)
        break
      case "join":
        setJoin(!join)
        break
      case "message":
        setMessage(value)
        break
      case "honeypotChecked":
        setHoneypotChecked(!honeypotChecked)
        break
      case "emailPermissionChecked":
        setEmailPermissionChecked(!emailPermissionChecked)
        emailPermissionToUse === "Yes"
          ? setEmailPermissionToUse("No")
          : setEmailPermissionToUse("Yes")
        break
      default:
    }
  }

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formValidation()) {
      setIsSubmitting(true)
      setError(false)

      const { encryptedData, iv } = await encryptData(
        process.env.GATSBY_FUNCTIONS_API_KEY
      )

      /* console.log({
        name,
        email,
        message,
        destination,
        subject,
        emailPermissionToUse: join ? "Yes" : "No",
        honeypotChecked,
        apiKey: encryptedData,
        iv,
      }) */

      /* fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name,
          email,
          message,
          destination,
          emailPermissionToUse,
          honeypotChecked,
        }),
      }) */
      fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          name,
          email,
          message,
          destination,
          subject,
          join,
          emailPermissionToUse,
          honeypotChecked,
          apiKey: encryptedData,
          iv,
        }),
      })
        .then(response => {
          if (response.ok) {
            setIsMessageSent(true)
            setIsSubmitting(false)
          } else {
            throw response
          }
        })
        .catch(error => {
          alert("Something went wrong. Please refresh the page and try again.")
          setIsSubmitting(false)
        })
      //submit form
    } else {
      // don't submit form
      setError(true)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form">
      {!isMessageSent ? (
        <>
          {title && <h4>{title}</h4>}
          <form
            onSubmit={e => handleSubmit(e)}
            name="contact"
            method="post"
            action="/thank-you"
            netlify-honeypot="honeypot"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Your Name*
                {error && name.length < 3 && (
                  <span style={{ color: "red" }}></span>
                )}
              </label>

              <input
                type="text"
                className={`form-control ${
                  error && name.length < 3 && "is-invalid"
                }`}
                placeholder="Full name"
                aria-label="Full name"
                name="name"
                value={name}
                onChange={event => handleOnChange(event, "name")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address*
              </label>
              <input
                type="email"
                className={`form-control ${
                  emailState === "invalid" && "is-invalid"
                } ${error && emailState === "blank" && "is-invalid"}`}
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={event => handleOnChange(event, "email")}
                onBlur={() => emailValidation()}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="subject">
                Subject*
              </label>
              <select
                className="form-control"
                onChange={event => handleOnChange(event, "subject")}
                name="subject"
                id="subject"
                value={subject}
              >
                {SUBJECT_LIST.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Message*
              </label>
              <textarea
                className={`form-control ${
                  error && message.length < 4 && "is-invalid"
                }`}
                id="exampleFormControlTextarea1"
                rows="3"
                name="message"
                value={message}
                onChange={event => handleOnChange(event, "message")}
                required
              ></textarea>
            </div>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={event => handleOnChange(event, "join")}
                id="join"
                name="join"
                defaultChecked={join}
                value={join}
                style={{ backgroundColor: "#1f1f1f" }}
              />
              <label className="form-check-label" htmlFor="flexCheckSaveEmail">
                Would you like to be added to my email list? I will only use
                this for communication related to Jason Kyle Smith Photography
                and will never sell or give away any information about you.
              </label>
            </div>
            <input
              className="form-check-input"
              type="checkbox"
              onChange={event => handleOnChange(event, "honeypotChecked")}
              id="flexCheckDefault"
              name="honeypot"
              hidden
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault"
              hidden
            >
              Default checkbox
            </label>
            {/*         <div className="form-check mb-4">
          <input
            className="form-check-input accent-input"
            type="checkbox"
            onChange={event => handleOnChange(event, "emailPermissionChecked")}
            id="flexCheckSaveEmail"
            name="emailPermissionChecked"
            value={emailPermissionChecked}
          />
          <label className="form-check-label" htmlFor="flexCheckSaveEmail">
            Would you like to be added to my email list? I will only use this
            for communication related to my photography and will never sell or
            give away any information about you.
          </label>
        </div>
        <input
          className="form-check-input"
          type="text"
          id="emailPermissionToUse"
          name="emailPermissionToUse"
          value={emailPermissionToUse}
          readOnly
          hidden
        />
        <label htmlFor="emailPermissionToUse" hidden>
          Permission to use email for email list?
        </label> */}
            <input
              className="form-check-input"
              type="text"
              id="destination"
              name="destination"
              value={destination}
              readOnly
              hidden
            />
            <label hidden htmlFor="destination">
              Destination
            </label>
            <button
              name="submit"
              className="btn button"
              type="submit"
              disabled={isSubmitting}
            >
              {buttonText ? buttonText : "Submit"}
            </button>
            {error && (
              <span className="ms-2 small" style={{ color: "red" }}>
                Please be sure to fill out the whole form
              </span>
            )}
          </form>
        </>
      ) : (
        <div>
          <h5>Thank you!</h5>
          <p>I'll get back with you as soon as I can!</p>
          <p>
            <button
              name="send another message"
              className="btn button"
              onClick={resetForm}
            >
              Send another message?
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default ContactForm
