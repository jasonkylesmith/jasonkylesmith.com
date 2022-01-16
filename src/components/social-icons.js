import * as React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab)

const SocialIcons = props => {
  return (
    <>
      <a
        href="https://www.linkedin.com/in/jasonkylesmith"
        target="_new"
        className="icon"
      >
        <FontAwesomeIcon
          icon={["fab", "linkedin"]}
          className="me-1 icon"
          viewBox="0 0 448 1"
        />
      </a>
      <a
        href="https://www.github.com/jasonkylesmith"
        target="_new"
        className="icon"
      >
        <FontAwesomeIcon
          icon={["fab", "github-square"]}
          className="mx-1 icon"
          viewBox="0 0 448 1"
        />
      </a>
      <a
        href="https://www.twitter.com/jayisawebdev"
        target="_new"
        className="icon"
      >
        <FontAwesomeIcon
          icon={["fab", "twitter-square"]}
          className="mx-1 icon"
          viewBox="0 0 448 1"
        />
      </a>
      <a
        href="https://www.instagram.com/jasonksmith84"
        target="_new"
        className="icon"
      >
        <FontAwesomeIcon
          icon={["fab", "instagram-square"]}
          className="mx-1 icon"
          viewBox="0 0 448 1"
        />
      </a>
    </>
  )
}

export default SocialIcons
