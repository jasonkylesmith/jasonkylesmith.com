import * as React from "react"
import icon from "../images/hex-icon-plain.svg"
import MenuIcon from "./menu-icon"
import { Link } from "gatsby"

const Header = props => {
  if (props.version === "desktop") {
    return (
      <header>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div>
              {/* <img src={icon} className="icon" alt="Purple Hexagon Icon" /> */}
              <h1 className="logo m-0">Jason Kyle Smith</h1>
            </div>
          </Link>
        </div>
      </header>
    )
  } else {
    return (
      <header>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div>
              {/* <img src={icon} className="icon" alt="Purple Hexagon Icon" /> */}
              <h1 className="logo m-0">Jason Kyle Smith</h1>
            </div>
          </Link>

          <MenuIcon />
        </div>
      </header>
    )
  }
}

export default Header
