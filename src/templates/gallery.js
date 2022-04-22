import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/tags"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import BlockStory from "../components/block-story"
import BlockGallery from "../components/block-gallery"
import BlockFeature from "../components/block-feature"

export const query = graphql`
  query ($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
      contentful_id
      name
      blocks {
        ... on ContentfulBlockFeature {
          id
          name
          variant
          blockItems {
            ... on ContentfulBlockItemImage {
              id
              sys {
                contentType {
                  sys {
                    id
                  }
                }
              }
              image {
                gatsbyImageData
                description
              }
            }
            ... on ContentfulBlockItemText {
              id
              sys {
                contentType {
                  sys {
                    id
                  }
                }
              }
              text {
                raw
              }
            }
          }
          sys {
            contentType {
              sys {
                id
              }
            }
          }
        }
        ... on ContentfulBlockGallery {
          id
          name
          images {
            id
            gatsbyImageData(
              breakpoints: [200, 400, 600, 800, 1000, 1600]
              sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
            )
            file {
              url
              details {
                image {
                  height
                  width
                }
              }
            }
          }
          variant
          sys {
            contentType {
              sys {
                id
              }
            }
          }
        }
        ... on ContentfulBlockStory {
          id
          name
          image {
            id
            gatsbyImageData
            description
          }
          imageFloat
          sys {
            contentType {
              sys {
                id
              }
            }
          }
          text {
            raw
          }
        }
      }
    }
  }
`

const Gallery = props => {
  /* const { title, description, tags, client, tools } =
    props.data.contentfulProject */

  const { blocks, name } = props.data.contentfulGallery

  return (
    <Layout>
      <Seo title={name} />
      {blocks.map(block => {
        const { id } = block.sys.contentType.sys

        if (id === "blockStory") {
          return (
            <div>
              <BlockStory block={block} key={block.id} />
              <hr />
            </div>
          )
        }

        if (id === "blockFeature") {
          return (
            <div>
              <BlockFeature block={block} key={block.id} />
              <hr />
            </div>
          )
        }

        if (id === "blockGallery") {
          return (
            <div>
              <BlockGallery block={block} key={block.id} />
              <hr />
            </div>
          )
        }
      })}
    </Layout>
  )
}

export default Gallery
