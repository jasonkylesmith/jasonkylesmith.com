import * as React from "react"
import { Link } from "gatsby"

const Navigation = props => {
  if (props.version === "desktop") {
    return (
      <nav className="d-none d-md-block">
        <ul>
          <li>
            <Link to="/" className="">
              home
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              about me
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              web development
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              graphic design
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              photography
            </Link>
          </li>
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
      <nav>
        <ul>
          <li>
            <Link to="/" className="">
              home
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              about me
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              web development
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              graphic design
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              photography
            </Link>
          </li>
          <li>
            <Link to="/blog/" className="">
              blog
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
