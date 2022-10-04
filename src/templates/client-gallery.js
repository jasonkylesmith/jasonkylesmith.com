import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import Seo from "../components/seo"

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
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
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
  const [allowAccess, setAllowAccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    if (enteredPassphrase === passphrase) {
      setAllowAccess(true)
      setError(false)
    } else {
      setAllowAccess(false)
      setError(true)
    }
  }

  return (
    <Layout>
      <Seo title={name} />
      {allowAccess ? (
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

              return <></>
            })}
          </div>
        </div>
      ) : (
        <div className="row p-0">
          <div className="col-sm-8 offset-sm-2">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <div className="px-2 p-md-o">
                <h2 className="m-0">Passphrase Required</h2>
                <span>
                  Please enter the passphrase given to you in your email.
                </span>
                <form>
                  <div className="my-2">
                    <label className="form-label" htmlFor="enteredPassphrase">
                      Passphrase
                    </label>
                    <input
                      placeholder="********"
                      name="enteredPassphrase"
                      type="password"
                      value={enteredPassphrase}
                      onChange={e => setEnteredPassphrase(e.target.value)}
                      className={`form-control ${error && "is-invalid"}`}
                      style={{ width: "50%" }}
                    />
                  </div>
                  <button className="btn button" onClick={e => handleSubmit(e)}>
                    Submit
                  </button>
                  {error && (
                    <span className="small ms-2" style={{ color: "red" }}>
                      Incorrect passphrase.
                    </span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ClientGallery
