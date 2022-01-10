import * as React from "react"

const Footer = props => {
  if (props.version === "desktop") {
    return (
      <footer>
        <span className="copyright d-none d-md-block">
          © {new Date().getFullYear()}, Jason Kyle Smith
        </span>
      </footer>
    )
  } else {
    return (
      <footer>
        <span className="copyright d-md-none">
          © {new Date().getFullYear()}, Jason Kyle Smith Mobile
        </span>
      </footer>
    )
  }
}

export default Footer
