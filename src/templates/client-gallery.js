import React, { useState } from "react"
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
    contentfulClientGallery(slug: { eq: $slug }) {
      contentful_id
      name
      passphrase
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
              caption
              includeCaption
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
      }
    }
  }
`

const ClientGallery = props => {
  /* const { title, description, tags, client, tools } =
    props.data.contentfulProject */

  const { blocks, name, passphrase } = props.data.contentfulClientGallery

  const [enteredPassphrase, setEnteredPassphrase] = useState("")

  return (
    <Layout>
      <Seo title={name} />
      {enteredPassphrase === passphrase ? (
        <div className="container-fluid p-0 mt-4">
          <div className="row p-0">
            <div className="col-sm-8 offset-sm-2">
              {blocks.map(block => {
                const { id } = block.sys.contentType.sys

                if (id === "blockStory") {
                  return (
                    <div>
                      <BlockStory block={block} key={block.id} />
                    </div>
                  )
                }

                if (id === "blockFeature") {
                  return (
                    <div>
                      <BlockFeature block={block} key={block.id} />
                    </div>
                  )
                }

                if (id === "blockGallery") {
                  return (
                    <div>
                      <BlockGallery block={block} key={block.id} />
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col d-flex justify-content-center align-content-center">
            <div
              style={{ width: "50%", border: "2px solid pink" }}
              className="d-flex flex-column justify-content-center"
            >
              <h2>Please enter the passphrase given to you in your email.</h2>
              <input
                placeholder="********"
                name="enteredPassphrase"
                type="password"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ClientGallery
