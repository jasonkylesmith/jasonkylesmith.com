import * as React from "react"
import icon from "../images/hex-icon-plain.svg"
import MenuIcon from "./menu-icon"
import { Link } from "gatsby"
import Navigation from "./navigation"
import Footer from "./footer"
import SocialIcons from "./social-icons"

const Header = props => {
  if (props.version === "desktop") {
    return (
      <header className="d-none d-md-block px-3">
        <div className="row justify-space-between">
          <div className="col-md-8 offset-md-2">
            <div className="row">
              <div className="col-8">
                <div className="logo-container col-12">
                  <Link to="/" className="logo-link">
                    <div>
                      {/* <img src={icon} className="logo-icon" alt="Purple Hexagon Icon" /> */}
                      <span className="logo">Jason Kyle Smith</span>
                      {/* <h1 className="logo">Jason Kyle Smith</h1> */}
                    </div>
                  </Link>
                </div>
                <div className="col-12" style={{ marginTop: "-.5rem" }}>
                  <Navigation version="desktop" />
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  } else {
    return (
      <header className="d-block d-md-none">
        <div className="logo-container me-2">
          <Link to="/" className="logo-link">
            <div>
              {/* <img src={icon} className="logo-icon" alt="Purple Hexagon Icon" /> */}
              <h1 className="logo">Jason Kyle Smith</h1>
            </div>
          </Link>

          <MenuIcon />
        </div>
      </header>
    )
  }
}

export default Header
