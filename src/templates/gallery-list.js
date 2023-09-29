import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import GalleryList from "../components/gallery-list"

export const query = graphql`
  query ($category: String!) {
    allContentfulGallery(
      sort: { order: ASC }
      filter: { category: { eq: $category } }
    ) {
      edges {
        node {
          sys {
            contentType {
              sys {
                id
              }
            }
          }
          contentful_id
          name
          slug
          category
          order
          featuredImage {
            title
            gatsbyImageData(
              quality: 100
              layout: CONSTRAINED
              resizingBehavior: FILL
              aspectRatio: 1.77
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`

const GalleryListPage = props => {
  const { edges } = props.data.allContentfulGallery
  const { category } = props.pageContext

  return (
    <Layout>
      <Seo title={`${category}`} />

      <div className="row mt-4">
        <div className="col-md-10 offset-md-1  standard-container-padding">
          {/* <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="block__heading">{category}</h1>
            </div>
            <div className="col-md-8 offset-md-2">
              <div className="row">
                {edges.map((gallery, index) => {
                  const { name, category, featuredImage, slug, contentful_id } =
                    gallery.node
                  const { gatsbyImageData, title } = featuredImage

                  return (
                    <div
                      className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0"
                      key={contentful_id}
                    >
                      <Link
                        to={`/${category
                          .toLowerCase()
                          .replace(/\s+/g, "")}/${slug}`}
                        className="gallery-link"
                      >
                        <div className="">
                          <div className="position-relative">
                            <GatsbyImage
                              className=""
                              imgStyle={{ borderRadius: ".25rem" }}
                              image={gatsbyImageData}
                              alt={title}
                            />
                          </div>
                          <div className="">
                            <h4 className="text-dark mt-1 mb-0">{name}</h4>
                            <span
                              className="text-dark small fw-normal"
                              style={{ fontSize: "14px" }}
                            ></span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div> */}
          <GalleryList module={edges} category={category} />
        </div>
      </div>
    </Layout>
  )
}

export default GalleryListPage
