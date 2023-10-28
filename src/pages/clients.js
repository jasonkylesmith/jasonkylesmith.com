import { useAuth0 } from "@auth0/auth0-react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Loading from "../components/loading"
import LoginButton from "../components/login-button"
import LogoutButton from "../components/logout-button"
import Seo from "../components/seo"
import LivePlaceholder from "../components/live-placeholder"

const Clients = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  const [clientGalleries, setClientGalleries] = useState([])

  const data = useStaticQuery(graphql`
    query {
      allContentfulClientGallery {
        edges {
          node {
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            name
            slug
            status
            hideImage
            featuredImage {
              gatsbyImageData
              title
              file {
                url
              }
              description
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Auth is no longer loading and session is authenticated,

      if (user.galleries && user.galleries.length > 0) {
        // gallery data exists and is not empty, so we need details on all galleries that the user has access to

        let admin = false

        if (user.sub === process.env.GATSBY_AUTH0_ADMIN) {
          admin = true
        }

        const { galleries } = user

        const { edges: allClientGalleries } = data.allContentfulClientGallery

        const tempGalleries = allClientGalleries.filter(({ node }) => {
          if (admin) {
            return true
          } else if (galleries.includes(node.contentful_id)) {
            if (node.status !== "draft") {
              return true
            } else {
              return false
            }
          }
        })

        setClientGalleries(tempGalleries)
      }
    }
  }, [isAuthenticated, isLoading, data, user])

  const headingText =
    clientGalleries.length > 1
      ? "Your Client Galleries"
      : clientGalleries.length === 1
      ? "Your Client Gallery"
      : "No Galleries Available Yet"

  /*   return process.env.GATSBY_ENVIRONMENT === "live" ? (
    <LivePlaceholder />
  ) : (
    <Layout>
      <Seo
        title={"Clients"}
        url={`https://jasonkylesmith.com/clients`}
        description={"Clients"}
        photo={null}
      />
      <div className="row mt-4">
        <div className="col-12 col-lg-12">
          <div className="row">
            {!isLoading ? (
              isAuthenticated ? (
                <>
                  <div className="col-md-10 offset-md-1">
                    <h1 className="block__heading">{headingText}</h1>
                  </div>
                  <div className="col-md-10 offset-md-1">
                    <div className="row">
                      {clientGalleries &&
                        clientGalleries.map(
                          ({
                            node: {
                              name,
                              featuredImage,
                              contentful_id,
                              hideImage,
                              slug,
                            },
                          }) => {
                            const { gatsbyImageData, title } =
                              featuredImage ?? null

                            return (
                              <div
                                className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0"
                                key={contentful_id}
                              >
                                <Link
                                  to={`/clients/${slug}`}
                                  className="gallery-link"
                                >
                                  <div className="">
                                    <div className="position-relative">
                                      <GatsbyImage
                                        className=""
                                        imgStyle={{
                                          borderRadius: ".25rem",
                                          filter: hideImage
                                            ? "blur(10px)"
                                            : null,
                                        }}
                                        image={gatsbyImageData}
                                        alt={title}
                                      />
                                    </div>
                                    <div className="">
                                      <h4 className="text-dark mt-1 mb-0">
                                        {name}
                                      </h4>
                                      <span
                                        className="text-dark small fw-normal"
                                        style={{ fontSize: "14px" }}
                                      ></span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            )
                          }
                        )}
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <LogoutButton>Logout</LogoutButton>
                      </div>
                    </div>
                  </div>
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
              <Loading />
            )}
          </div>
        </div>
      </div>
    </Layout>
  ) */

  return (
    <Layout>
      <Seo
        title={"Clients"}
        url={`https://www.jasonkylesmith.com/clients/`}
        description={"Clients"}
        photo={null}
      />
      <div className="row mt-4">
        <div className="col-12 col-lg-12">
          <div className="row">
            {!isLoading ? (
              isAuthenticated ? (
                <>
                  <div className="col-md-10 offset-md-1">
                    <h1 className="block__heading">{headingText}</h1>
                  </div>
                  <div className="col-md-10 offset-md-1">
                    <div className="row">
                      {clientGalleries &&
                        clientGalleries.map(
                          ({
                            node: {
                              name,
                              featuredImage,
                              contentful_id,
                              hideImage,
                              slug,
                            },
                          }) => {
                            const { gatsbyImageData, title } =
                              featuredImage ?? null

                            return (
                              <div
                                className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0"
                                key={contentful_id}
                              >
                                <Link
                                  to={`/clients/${slug}`}
                                  className="gallery-link"
                                >
                                  <div className="">
                                    <div className="position-relative">
                                      <GatsbyImage
                                        className=""
                                        imgStyle={{
                                          borderRadius: ".25rem",
                                          filter: hideImage
                                            ? "blur(10px)"
                                            : null,
                                        }}
                                        image={gatsbyImageData}
                                        alt={title}
                                      />
                                    </div>
                                    <div className="">
                                      <h4 className="text-dark mt-1 mb-0">
                                        {name}
                                      </h4>
                                      <span
                                        className="text-dark small fw-normal"
                                        style={{ fontSize: "14px" }}
                                      ></span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            )
                          }
                        )}
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <LogoutButton>Logout</LogoutButton>
                      </div>
                    </div>
                  </div>
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
              <Loading />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Clients
