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
        style={{
          margin: `0 auto`,
          maxWidth: `100vw`,
          height: `100vh`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <header>
          <div className="logo-container">
            <img src={icon} className="icon" />
            <h1 className="logo">Jason Kyle Smith</h1>
          </div>
        </header>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <span className="copyright">
            © {new Date().getFullYear()}, Jason Kyle Smith
          </span>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
