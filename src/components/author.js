import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
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
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: CONSTRAINED
            resizingBehavior: CROP
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
          <Link to="/about" className="gallery-link">
            <GatsbyImage
              image={photo.gatsbyImageData}
              alt={photo.description}
            />
          </Link>
        </div>
        <div className="d-flex flex-column">
          <div className="author-name">
            <h6>{name}</h6>
          </div>
          <div className="author-description">
            <p className="small">{description}</p>
            <div
              className="d-flex flex-row gap-2"
              style={{ marginLeft: "-.25rem" }}
            >
              <SocialIcons version="author" />
              <Link to="/about" className="author-link">
                About Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Author
