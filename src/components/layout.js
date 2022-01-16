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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab)

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
      <div className="layout-container">
        <div className="hero-text w-100 h-100 position-absolute m-0 d-flex flex-column justify-content-center align-items-center">
          <h1>Jason Kyle Smith</h1>
          <p>Coming Soon</p>
          <div className="position-absolute" style={{ bottom: "1rem" }}>
            <a
              href="https://www.linkedin.com/in/jasonkylesmith"
              target="_new"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                className="me-1 icon"
                viewBox="0 0 448 1"
              />
            </a>
            <a
              href="https://www.github.com/jasonkylesmith"
              target="_new"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "github-square"]}
                className="mx-1 icon"
                viewBox="0 0 448 1"
              />
            </a>
            <a
              href="https://www.twitter.com/jayisawebdev"
              target="_new"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "twitter-square"]}
                className="mx-1 icon"
                viewBox="0 0 448 1"
              />
            </a>
            <a
              href="https://www.instagram.com/jasonksmith84"
              target="_new"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "instagram-square"]}
                className="mx-1 icon"
                viewBox="0 0 448 1"
              />
            </a>
          </div>
        </div>
        {/* SIDEBAR WRAPPER*/}

        <div className="sidebar d-none d-md-block">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="position-fixed d-none d-md-flex flex-column justify-content-between vh-100">
                  {/* <Header version="desktop" /> */}

                  {/* <Navigation version="desktop" /> */}

                  {/* <Footer version="desktop" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT WRAPPER*/}
        <div className="content pt-0 pt-md-3">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="d-flex d-md-none mobile-header sticky-top align-items-center">
                <Header version="mobile" />
              </div> */}
              <div className="col">{/* <main>{children}</main> */}</div>

              {/* <div className="">
                <Footer version="mobile" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
