import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import Seo from "../components/seo"

import BlockStory from "../components/block-story"
import BlockGallery from "../components/block-gallery"
import BlockFeature from "../components/block-feature"
import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../components/login-button"

export const query = graphql`
  query ($slug: String!) {
    contentfulClientGallery(slug: { eq: $slug }) {
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
  const { contentful_id } = props.data.contentfulClientGallery

  const { isLoading, isAuthenticated, user, loginWithPopup } = useAuth0()
  const [idMatch, setIdMatch] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user.galleries.includes(contentful_id)) {
        setIdMatch(true)
      }
    }
  }, [isAuthenticated, isLoading])

  const { blocks, name } = props.data.contentfulClientGallery

  return (
    <Layout>
      <Seo title={name} />
      <div className="row mt-4 px-2">
        <div className="col-md-8 offset-md-2">
          {!isLoading ? (
            isAuthenticated ? (
              idMatch ? (
                "Access Granted"
              ) : (
                "Access Denied"
              )
            ) : (
              <div style={{ marginTop: "6rem" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span> Access Denied</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LoginButton>Log In Required</LoginButton>
                </div>
              </div>
            )
          ) : (
            <div>Loading graphic goes here...</div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ClientGallery
