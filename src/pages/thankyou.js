import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { useLocation } from "@reach/router"
import queryString from "query-string"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { Link, navigate } from "gatsby"
import LivePlaceholder from "../components/live-placeholder"

library.add(fas)

const ThankYouPage = () => {
  const [destination, setDestination] = useState(null)

  const location = useLocation()
  const urlQuery = queryString.parse(location.search)

  useEffect(() => {
    if (urlQuery.destination) {
      setDestination(urlQuery.destination)
    }
  }, [urlQuery.destination])

  let message
  switch (destination) {
    case "square":
      message =
        "Thank you for your payment! Check your email for your receipt and I will email you a confirmation as soon as possible."
      break
    case "":
      message =
        "I appreciate you reaching out! I'll email you back as soon as I can!"
      break
    default:
      message = ""
  }

  return process.env.GATSBY_ENVIRONMENT === "live" ? (
    <LivePlaceholder />
  ) : (
    <Layout>
      <Seo title="Thank You!" />

      <div className="row w-100 h-75 p-0">
        <div className="not-found-page-column col-12  d-flex flex-column justify-content-center align-items-center text-center">
          <div className="bg-text-container d-flex justify-content-center align-items-center">
            <h1 className="thanks">Thanks!</h1>
          </div>
          <h2>{message}</h2>
          <Nav />
        </div>
      </div>
    </Layout>
  )
}

const Nav = props => {
  return (
    <div className="post-nav ">
      <div className="post-nav-wrapper justify-content-end">
        <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        <button className="btn-link" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      <div className="post-nav-wrapper justify-content-start">
        <Link to="/">Go Home</Link>
        <FontAwesomeIcon icon={["fas", "chevron-right"]} />
      </div>
    </div>
  )
}

export default ThankYouPage
