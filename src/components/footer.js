import * as React from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import SocialIcons from "./social-icons"

library.add(fab)

const Footer = props => {
  if (props.version === "desktop") {
    return (
      <footer className="d-none d-md-flex align-items-center row px-2 m-0">
        <div className="col-md-8 offset-md-2 text-center">
          <div className="text-white">
            {/* <a href="/clients">clients</a> -  */}
            {/* <a href="/contact">contact</a> */}
            {/*  -
            <a href="/contact"> privacy policy</a> */}
          </div>
          <span
            className="copyright d-none d-md-block"
            style={{
              marginLeft: "-.5rem",
              color: "#FFFFFF",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()}, Jason Kyle Smith
          </span>
        </div>
      </footer>
    )
  } else if (props.version === "mobile") {
    return (
      <footer className="d-flex flex-column align-items-center d-md-none menu">
        <div>
          <SocialIcons />
        </div>
        <div>
          <span
            className="copyright d-md-none text-white"
            style={{
              color: "#FFFFFF",
              fontWeight: "500",
            }}
          >
            © {new Date().getFullYear()}, Jason Kyle Smith
          </span>
        </div>
      </footer>
    )
  } else {
    return (
      <footer className="d-flex flex-column align-items-center menu">
        <div>
          <SocialIcons />
        </div>
        <div>
          <span
            className="copyright d-md-none text-white"
            style={{
              color: "#FFFFFF",
              fontWeight: "500",
            }}
          >
            © {new Date().getFullYear()}, Jason Kyle Smith
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer
