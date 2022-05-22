import React, { useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactFormPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  // blank, invalid, valid
  const [emailState, setEmailState] = useState("blank")
  const [message, setMessage] = useState("")
  const [honeypotChecked, setHoneypotChecked] = useState(false)
  const [emailPermissionChecked, setEmailPermissionChecked] = useState(true)
  const [error, setError] = useState(false)

  const formValidation = () => {
    return emailState === "valid" && message.length > 3 && name.length > 2
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
      case "message":
        setMessage(value)
        break
      case "honeypotChecked":
        setHoneypotChecked(!honeypotChecked)
        break
      case "emailPermission":
        setEmailPermissionChecked(!emailPermissionChecked)
    }
  }

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = e => {
    if (formValidation()) {
      setError(false)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name,
          email,
          message,
          honeypotChecked,
        }),
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error))
      //submit form
    } else {
      e.preventDefault()
      // don't submit form
      setError(true)
    }
  }

  return (
    <Layout>
      <Seo title="Contact Me" />

      <div className="row mt-4 px-2">
        <div className="col-md-8 offset-md-2">
          <h1>Let's Get In Touch</h1>
          <form
            onSubmit={e => handleSubmit(e)}
            name="contact"
            method="post"
            action="/thankyou"
            netlify-honeypot="honeypot"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Your Name
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
                Email address
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
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Message
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
              ></textarea>
            </div>

            <input
              className="form-check-input"
              type="checkbox"
              value={honeypotChecked}
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
            <div className="form-check mb-4">
              <input
                className="form-check-input accent-input"
                type="checkbox"
                value={emailPermissionChecked}
                onChange={event => handleOnChange(event, "emailPermission")}
                id="flexCheckSaveEmail"
                name="emailPermission"
              />
              <label className="form-check-label" htmlFor="flexCheckSaveEmail">
                Would you like to be added to my email list? I will only use
                this for communication related to my photography and will never
                sell or give away any information about you.
              </label>
            </div>

            <button className="btn button" type="submit">
              Submit
            </button>
            {error && (
              <span className="ms-2 small" style={{ color: "red" }}>
                Please be sure to fill out the whole form
              </span>
            )}
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ContactFormPage
