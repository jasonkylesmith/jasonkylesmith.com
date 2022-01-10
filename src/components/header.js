import * as React from "react"
import icon from "../images/hex-icon-plain.svg"

const Header = props => {
  if (props.version === "desktop") {
    return (
      <header>
        <div className="logo-container">
          <img src={icon} className="icon" alt="Purple Hexagon Icon" />
          <h1 className="logo">Jason Kyle Smith</h1>
        </div>
      </header>
    )
  } else {
    return (
      <header>
        <div className="logo-container">
          <img src={icon} className="icon" alt="Purple Hexagon Icon" />
          <h1 className="logo">Jason Kyle Smith</h1>
        </div>
      </header>
    )
  }
}

export default Header
