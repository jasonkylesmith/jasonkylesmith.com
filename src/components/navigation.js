import * as React from "react"
import { Link } from "gatsby"

const Navigation = props => {
  if (props.version === "desktop") {
    return (
      <nav className="d-none d-md-block desktop-nav">
        <ul>
          <li>
            <Link to="/" className="">
              home
            </Link>
          </li>
          <li> - </li>
          <li>
            <Link to="/" className="">
              about me
            </Link>
          </li>
          <li> - </li>
          <li>
            <Link to="/blog/" className="">
              blog
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="mobile-nav">
        <ul>
          <li>
            <Link
              to="/"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              about me
            </Link>
          </li>

          <li>
            <Link
              to="/blog/"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              blog
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
