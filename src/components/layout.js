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

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab)

const Layout = ({ children, navColor, navSettings }) => {
  return (
    <>
      {/* CONTENT WRAPPER*/}

      <div
        className={`container-fluid d-flex flex-column justify-content-between ${
          navColor === "light" && "dark-nav-bg"
        }`}
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        <div className={`row mb-2`} style={{ zIndex: 3 }}>
          <Header
            version="desktop"
            navColor={navColor}
            navSettings={navSettings}
          />
          <Header
            version="mobile"
            navColor={navColor}
            navSettings={navSettings}
          />
        </div>

        <div className="row flex-fill m-0">
          <main className="p-0 container">{children}</main>
        </div>

        <div className="row page-footer">
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
