import * as React from "react"

const Navigation = props => {
  if (props.version === "desktop") {
    return (
      <nav className="d-none d-md-block">
        <ul>
          <li>home</li>
          <li>about me</li>
          <li>web development</li>
          <li>graphic design</li>
          <li>photography</li>
          <li>blog</li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
        <ul>
          <li>home</li>
          <li>about me</li>
          <li>web development</li>
          <li>graphic design</li>
          <li>photography</li>
          <li>blog</li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
