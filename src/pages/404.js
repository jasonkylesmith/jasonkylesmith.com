import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { Link, navigate, useStaticQuery, graphql } from "gatsby"

library.add(fas)

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulNavigation(name: { eq: "Placeholder Nav" }) {
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

  return (
    <Layout navSettings={data?.contentfulNavigation}>
      <Seo title="404 - Page Not found" />

      <div className="row w-100 h-75" style={{ height: "90%" }}>
        <div className="not-found-page-column col-12 d-flex flex-column justify-content-center align-items-center text-center">
          <div className="bg-text-container d-flex justify-content-center align-items-center">
            <h1>404</h1>
          </div>
          <h2>This is not the page you're looking for.</h2>
          <Nav404 />
        </div>
      </div>
    </Layout>
  )
}

const Nav404 = props => {
  return (
    <div className="post-nav ">
      <div className="post-nav-wrapper justify-content-end">
        <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        <button
          name="go back"
          className="btn-link"
          onClick={() => navigate(-1)}
        >
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
