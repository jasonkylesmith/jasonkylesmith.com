import React, { useEffect, useMemo, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import Seo from "../components/seo"

import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../components/login-button"
import ClientPhotos from "../components/client-photos"
import Tooltip from "../components/tooltip"
import { CLIENT_GALLERY_STATUS_TEXT } from "../helpers/constants"
import Loading from "../components/loading"

export const query = graphql`
  query ($slug: String!) {
    contentfulClientGallery(slug: { eq: $slug }) {
      contentful_id
      name
      nextDueDate(formatString: "Do MMMM, YYYY")
      photoshootDate(formatString: "Do MMMM, YYYY")
      downloadLink
      status
      photographs {
        gatsbyImageData
        contentful_id
        description
        title
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
      photos {
        photoStatus
        photoName
        photographerRating
        clientFavorite
        photo {
          contentful_id
          gatsbyImageData
          file {
            details {
              image {
                height
                width
              }
            }
            url
          }
          description
        }
      }
    }
  }
`

const ClientGallery = props => {
  const {
    contentful_id,
    name,
    photographs,
    photoshootDate,
    nextDueDate,
    status,
    downloadLink,
    photos,
  } = props.data.contentfulClientGallery

  const { isLoading, isAuthenticated, user } = useAuth0()
  const [idMatch, setIdMatch] = useState(false)
  const [photosByStatus, setPhotosByStatus] = useState({
    previews: [],
    reviews: [],
    finals: [],
    photographs: [],
  })

  useMemo(() => {
    let previews = []
    let reviews = []
    let finals = []

    photos?.forEach(photo => {
      const { photoStatus } = photo

      switch (photoStatus) {
        case "preview":
          previews.push(photo)
          break
        case "review":
          reviews.push(photo)
          break
        case "final":
          finals.push(photo)
          break
        default:
          finals.push(photo)
      }
    })

    if (photographs?.length > 0) {
      photographs.sort(
        (a, b) =>
          a.title.substring(a.title.lastIndexOf("-") + 1) -
          b.title.substring(b.title.lastIndexOf("-") + 1)
      )
    }

    setPhotosByStatus({ previews, reviews, finals, photographs })
  }, [photos, photographs])

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const admin = user.sub === process.env.GATSBY_AUTH0_ADMIN ? true : false
      if (admin || user.galleries.includes(contentful_id)) {
        setIdMatch(true)
      }
    }
  }, [isAuthenticated, isLoading, contentful_id, user])

  return (
    <Layout>
      <Seo title={name} />
      <div className="row mt-4 mb-5">
        <div className="col-md-10 offset-md-1">
          {!isLoading ? (
            isAuthenticated ? (
              idMatch ? (
                <>
                  <h1 className="block__heading">{name}</h1>
                  <div className="row justify-space-between">
                    <div className="col-12 col-lg-8 m-0 d-flex flex-column">
                      <span>
                        <b>photoshoot date:</b> {photoshootDate}
                      </span>
                      {/* <span>
                        <b>next due date:</b> {nextDueDate}
                      </span> */}
                    </div>
                    <div className="col-12 col-lg-4 m-0 d-flex flex-column">
                      {/*  <span>
                        <b>status: </b>

                        <span title={CLIENT_GALLERY_STATUS_TEXT[status]}>
                          {status}
                        </span>
                      </span> */}

                      {downloadLink && (
                        <span>
                          <a
                            href={downloadLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download Final Deliverables
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                  {photosByStatus.previews.length > 0 && (
                    <div className="mt-4">
                      <h2 className="block__heading">Previews</h2>
                      <ClientPhotos photos={photosByStatus.previews} />
                    </div>
                  )}
                  {photosByStatus.reviews.length > 0 && (
                    <div className="mt-4">
                      <h2 className="block__heading">Ready for Review</h2>
                      <ClientPhotos photos={photosByStatus.reviews} />
                    </div>
                  )}
                  {photosByStatus.finals.length > 0 && (
                    <div className="mt-4">
                      <h2 className="block__heading">Final Photos</h2>
                      <ClientPhotos photos={photosByStatus.finals} />
                    </div>
                  )}
                  {photosByStatus.photographs?.length > 0 && (
                    <div className="mt-4">
                      {/* <h2 className="block__heading">Photos</h2> */}
                      <ClientPhotos photos={photosByStatus.photographs} />
                    </div>
                  )}
                </>
              ) : (
                <div style={{ marginTop: "6rem" }}>
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
              <div style={{ marginTop: "6rem" }}>
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
            <Loading />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ClientGallery
