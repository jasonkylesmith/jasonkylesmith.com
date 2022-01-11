import * as React from "react"
import icon from "../images/hex-icon-plain.svg"
import MenuIcon from "./menu-icon"

const Header = props => {
  if (props.version === "desktop") {
    return (
      <header>
        <div className="logo-container">
          <div>
            <img src={icon} className="icon" alt="Purple Hexagon Icon" />
            <h1 className="logo">Jason Kyle Smith</h1>
          </div>
        </div>
      </header>
    )
  } else {
    return (
      <header>
        <div className="logo-container">
          <div>
            <img src={icon} className="icon" alt="Purple Hexagon Icon" />
            <h1 className="logo">Jason Kyle Smith</h1>
          </div>

          <MenuIcon />
        </div>
      </header>
    )
  }
}

export default Header
