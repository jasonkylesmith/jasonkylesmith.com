import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab)

const SocialIcons = props => {
  const data = useStaticQuery(graphql`
    query {
      contentfulAuthor(name: { eq: "Jason Smith" }) {
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

  return (
    <div>
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
    </div>
  )
}

export default SocialIcons
