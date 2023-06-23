/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"

import Header from "./header"

import "../scss/main.scss"
import Footer from "./footer"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <>
      {/* CONTENT WRAPPER*/}

      <div
        className="container-fluid d-flex flex-column justify-content-between"
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        {process.env.GATSBY_ENVIRONMENT !== "live" ? (
          <div className="row mb-2">
            <Header version="desktop" />
            <Header version="mobile" />
          </div>
        ) : (
          <div className="logo-container col-12">
            <Link to="/" className="logo-link">
              <div>
                <span className="logo">Jason Kyle Smith</span>
              </div>
            </Link>
          </div>
        )}
        <div className="row flex-fill m-0">
          <main className="p-0 container">{children}</main>
        </div>
        {process.env.GATSBY_ENVIRONMENT !== "live" && (
          <div
            className="row"
            style={{ position: "fixed", bottom: 0, width: "100%" }}
          >
            <Footer version="desktop" />
            <Footer version="mobile" />
          </div>
        )}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
