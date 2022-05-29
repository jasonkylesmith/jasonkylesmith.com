import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import SocialIcons from "./social-icons"

const Author = props => {
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
        name
        description
        photo {
          gatsbyImageData(
            width: 150
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          description
        }
      }
    }
  `)

  const { name, description, photo } = data.contentfulAuthor

  return (
    <>
      <div className="author-container">
        <div className="author-image-wrapper">
          <GatsbyImage image={photo.gatsbyImageData} alt={photo.description} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="author-name">
            <h6>{name}</h6>
          </div>
          <div className="author-description">
            <p className="small">{description}</p>
            <div style={{ marginLeft: "-.25rem" }}>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Author
