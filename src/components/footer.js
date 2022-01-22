import * as React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import SocialIcons from "./social-icons"

library.add(fab)

const Footer = props => {
  if (props.version === "desktop") {
    return (
      <footer>
        <SocialIcons />
        <span className="copyright d-none d-md-block">
          © {new Date().getFullYear()}, Jason Kyle Smith
        </span>
      </footer>
    )
  } else if (props.version === "mobile") {
    return (
      <footer className="d-flex flex-column align-items-center d-md-none">
        <div>
          <SocialIcons />
        </div>
        <div>
          <span className="copyright d-md-none">
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
          <span className="copyright d-md-none">
            © {new Date().getFullYear()}, Jason Kyle Smith
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer
