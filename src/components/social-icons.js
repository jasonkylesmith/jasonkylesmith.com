import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import PayButton from "./pay-button"
import { useState } from "react"

library.add(fab)
library.add(fas)

const SocialIcons = props => {
  const data = useStaticQuery(graphql`
    query {
      contentfulAuthor(name: { eq: "Jason Kyle Smith" }) {
        contentful_id
        sys {
          type
          contentType {
            sys {
              id
            }
          }
        }
        linkedIn
        twitter
        gitHub
        instagram
      }
    }
  `)

  const { linkedIn, twitter, gitHub, instagram } = data.contentfulAuthor

  const [payVisible, setPayVisible] = useState(false)
  const togglePayVisible = () => {
    setPayVisible(!payVisible)
  }

  return (
    <div style={{ position: "relative" }}>
      <a href={twitter} target="_new" className="icon">
        <FontAwesomeIcon
          icon={["fab", "twitter-square"]}
          className="mx-1 icon"
        />
      </a>
      <a href={instagram} target="_new" className="icon">
        <FontAwesomeIcon
          icon={["fab", "instagram-square"]}
          className="mx-1 icon"
        />
      </a>
      <button
        onClick={togglePayVisible}
        className="icon"
        style={{ borderWidth: 0 }}
      >
        <FontAwesomeIcon
          icon={["fas", "dollar-sign"]}
          className={`mx-1 icon ${props.version !== "desktop" ? "mobile" : ""}`}
        />
      </button>
      {props?.version === "desktop" && payVisible && (
        <div style={{ position: "absolute", right: 0, zIndex: 10 }}>
          <PayButton />
        </div>
      )}
      {props?.version !== "desktop" && payVisible && (
        <div
          style={{ position: "absolute", bottom: 30, left: -80, zIndex: 10 }}
        >
          <PayButton />
        </div>
      )}
    </div>
  )
}

export default SocialIcons
