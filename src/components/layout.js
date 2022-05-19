/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

import "../scss/main.scss"
import Footer from "./footer"
import Navigation from "./navigation"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
          <main className="p-0">{children}</main>
        </div>
        <div className="row">
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
