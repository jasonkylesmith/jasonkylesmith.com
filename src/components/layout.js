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

const Layout = ({ children }) => {
  return (
    <>
      {/* CONTENT WRAPPER*/}

      <div
        className="container-fluid d-flex flex-column justify-content-between"
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        <div className="row">
          <Header version="desktop" />
          <Header version="mobile" />
        </div>
        <div className="row flex-fill">
          <main className="p-0 d-flex">{children}</main>
        </div>
        <div
          className="row"
          style={{ position: "fixed", bottom: 0, width: "100%" }}
        >
          <Footer version="desktop" />
          <Footer version="mobile" />
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
