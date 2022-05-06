import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

export const query = graphql`
  query ($category: String!) {
    allContentfulGallery(filter: { category: { eq: $category } }) {
      edges {
        node {
          contentful_id
          name
          slug
          category
        }
      }
    }
  }
`

const GalleryList = props => {
  const { edges } = props.data.allContentfulGallery

  console.log(edges)

  return (
    <Layout>
      <Seo title="Gallery list" />

      {/* 
      <div className="row mt-4 px-2">
        <div className="col-12 col-lg-10 offset-lg-1">
          <div className="row">
            {filteredEdges.map((post, index) => {
              console.log(post.node)

              return (
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0">
                  {post.node.featuredImage && (
                    <Link to={`/blog/${post.node.slug}`} className="">
                      <div className="">
                        <div className="position-relative">
                          <GatsbyImage
                            className=""
                            image={post.node.featuredImage.gatsbyImageData}
                            alt={post.node.title}
                          />

                          <Tags tags={post.node.tags} />
                        </div>
                        <div className="">
                          <h4 className="text-dark mt-1 mb-0">
                            {post.node.title}
                          </h4>
                          <span
                            className="text-dark small fw-normal"
                            style={{ fontSize: "14px" }}
                          >
                            {post.node.publishedDate}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
 */}
    </Layout>
  )
}

export default GalleryList
