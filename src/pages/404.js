import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { Link, navigate } from "gatsby"

library.add(fas)

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />

    <div className="row h-100">
      <div className="not-found-page-column col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-1 mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-center text-center">
        <div className="bg-text-container d-flex justify-content-center align-items-center">
          <h1>404</h1>
        </div>
        <h1>This is not the page you're looking for</h1>
        <Nav404 />
      </div>
    </div>
  </Layout>
)

const Nav404 = props => {
  return (
    <div className="post-nav ">
      <div className="post-nav-wrapper justify-content-end">
        <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        <button className="btn-link" onCLick={() => navigate(-1)}>
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

export default NotFoundPage
