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
import icon from "../images/hex-icon-plain.svg"
import "./layout.css"
import "../scss/main.scss"

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
      <div
        className="layout-container"
        style={{
          margin: `0 auto`,
          maxWidth: `100vw`,
          height: `100vh`,
        }}
      >
        {/* SIDEBAR WRAPPER*/}

        <div className="sidebar">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="position-fixed d-flex flex-column justify-content-between vh-100">
                  <header>
                    <div className="logo-container">
                      <img src={icon} className="icon" />
                      <h1 className="logo">Jason Kyle Smith</h1>
                    </div>
                  </header>

                  <nav>
                    <ul>
                      <li>home</li>
                      <li>about me</li>
                      <li>web development</li>
                      <li>graphic design</li>
                      <li>photography</li>
                      <li>blog</li>
                    </ul>
                  </nav>

                  <footer>
                    <span className="copyright">
                      © {new Date().getFullYear()}, Jason Kyle Smith
                    </span>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT WRAPPER*/}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            {/* SIDEBAR */}
            {/* <div className="col-3 border border-danger">
              <div className="position-fixed d-flex flex-column justify-content-between vh-100">
                <header>
                  <div className="logo-container">
                    <img src={icon} className="icon" />
                    <h1 className="logo">Jason Kyle Smith</h1>
                  </div>
                </header>

                <nav>
                  <ul>
                    <li>home</li>
                    <li>about me</li>
                    <li>web development</li>
                    <li>graphic design</li>
                    <li>photography</li>
                    <li>blog</li>
                  </ul>
                </nav>

                <footer>
                  <span className="copyright">
                    © {new Date().getFullYear()}, Jason Kyle Smith
                  </span>
                </footer>
              </div>
            </div> */}
            {/* MAIN CONTENT */}
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
