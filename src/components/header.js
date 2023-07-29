import * as React from "react"

import MenuIcon from "./menu-icon"
import { Link } from "gatsby"
import Navigation from "./navigation"

import SocialIcons from "./social-icons"

const Header = props => {
  if (props.version === "desktop") {
    return (
      <header className="d-none d-md-block">
        <div className="row justify-space-between">
          <div className="col-md-10 offset-md-1">
            <div className="row">
              <div className="col-12 p-0">
                <div className="logo-container col-12">
                  <Link to="/" className="logo-link">
                    <div>
                      <span
                        className="logo"
                        style={
                          props.navColor === "light"
                            ? { color: "white" }
                            : props.navColor === "dark"
                            ? { color: "#1f1f1f" }
                            : { color: "#1f1f1f" }
                        }
                      >
                        Jason Kyle Smith
                      </span>
                    </div>
                  </Link>
                  <MenuIcon version={"desktop"} navColor={props.navColor} />
                </div>
                {/* <div className="col-12" style={{ marginTop: "-.5rem" }}>
                  <Navigation version="desktop" />
                </div> */}
              </div>
              {/* <div className="col-4 d-flex justify-content-end">
                <SocialIcons version="desktop" />
              </div> */}
            </div>
            <div className="row">
              <div
                className={`col-12 p-0 ${
                  props.navColor === "light" && "light-nav"
                }`}
                style={{ marginTop: "-.5rem" }}
              >
                <Navigation version="desktop" />
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
              <h1
                className="logo"
                style={
                  props.navColor === "light"
                    ? { color: "white" }
                    : props.navColor === "dark"
                    ? { color: "#1f1f1f" }
                    : { color: "#1f1f1f" }
                }
              >
                Jason Kyle Smith
              </h1>
            </div>
          </Link>

          <MenuIcon navColor={props.navColor} />
        </div>
      </header>
    )
  }
}

export default Header
