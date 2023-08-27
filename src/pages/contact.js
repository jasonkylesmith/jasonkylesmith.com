import { useLocation } from "@reach/router"
import queryString from "query-string"
import { navigate, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"

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
  const [emailPermissionToUse, setEmailPermissionToUse] = useState("Yes")
  const [destination, setDestination] = useState("")
  const [error, setError] = useState(false)

  const location = useLocation()
  const urlQuery = queryString.parse(location.search)
  // ?destination=where-did-user-click added to /contact will allow passing of that information to netlify form to better inform context for user's inqiry

  const data = useStaticQuery(graphql`
    query {
      contentfulNavigation(name: { eq: "General Navigation" }) {
        id
        mainLinks {
          navLinkText
          slug
          name
        }
        name
      }
    }
  `)

  useEffect(() => {
    if (urlQuery.destination) {
      setDestination(urlQuery.destination)
    }
  }, [urlQuery.destination])

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

  const handleSubmit = e => {
    e.preventDefault()
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
          destination,
          emailPermissionToUse,
          honeypotChecked,
        }),
      })
        .then(() => navigate("/thankyou"))
        .catch(error =>
          alert("Something went wrong. Please refresh the page and try again.")
        )
      //submit form
    } else {
      // don't submit form
      setError(true)
    }
  }

  return (
    <Layout navSettings={data?.contentfulNavigation}>
      <Seo title="Contact Me" />

      <div className="row mt-4">
        <div className="col-md-10 offset-md-1 px-md-0">
          <h1 className="block__heading">Let's Get In Touch</h1>
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
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Message (optional, but helpful!)
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
            {/* <div className="form-check mb-4">
              <input
                className="form-check-input accent-input"
                type="checkbox"
                onChange={event =>
                  handleOnChange(event, "emailPermissionChecked")
                }
                id="flexCheckSaveEmail"
                name="emailPermissionChecked"
                value={emailPermissionChecked}
              />
              <label className="form-check-label" htmlFor="flexCheckSaveEmail">
                Would you like to be added to my email list? I will only use
                this for communication related to my photography and will never
                sell or give away any information about you.
              </label>
            </div> */}
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
            </label>
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
