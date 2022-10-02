import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Tags from "../components/tags"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            contentful_id
            title
            id
            slug
            featured
            publishedDate(formatString: "Do MMMM, YYYY")
            fullDate: publishedDate
            tags
            featuredImage {
              title
              gatsbyImageData(
                layout: FULL_WIDTH
                quality: 100
                resizingBehavior: CROP
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                aspectRatio: 2
              )
            }
            excerpt {
              childMarkdownRemark {
                excerpt(pruneLength: 360)
              }
            }
          }
        }
      }
    }
  `)

  const { edges } = data.allContentfulBlogPost

  const filteredEdges = edges.filter(edge => edge.node.slug !== "demo-post")
  // Filter out posts to be published in the future .filter(edge => new Date(edge.node.fullDate) <= new Date())

  return (
    <Layout>
      <Seo title="Blog | Jason Kyle Smith" />

      <div className="row mt-4 px-md-2 px-2">
        <div className="col-12 col-lg-12">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="block__heading">Blog Posts</h1>
            </div>
            <div className="col-md-8 offset-md-2">
              <div className="row">
                {filteredEdges.map((post, index) => {
                  return (
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0">
                      {post.node.featuredImage && (
                        <Link
                          to={`/blog/${post.node.slug}`}
                          className="gallery-link"
                        >
                          <div className="">
                            <div className="position-relative">
                              <GatsbyImage
                                className=""
                                imgStyle={{ borderRadius: ".25rem" }}
                                imgClass="gallery-image"
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
        </div>
      </div>
    </Layout>
  )
}

export default Blog
