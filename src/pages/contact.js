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
    }
  }

  const handleSubmit = e => {
    if (formValidation()) {
      setError(false)
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
          <form
            onSubmit={e => handleSubmit(e)}
            name="Contact Form"
            netlify-honeypot="honeypot"
            netlify
          >
            <input type="hidden" name="form-name" value="Contact Form" />
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Your Name{" "}
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

            <button className="btn btn-primary">Submit</button>
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
