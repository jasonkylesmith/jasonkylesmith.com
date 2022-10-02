import * as React from "react"

import MenuIcon from "./menu-icon"
import { Link } from "gatsby"

const Header = props => {
  if (props.version === "desktop") {
    return (
      <header>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div>
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
