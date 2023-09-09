import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags, { Tag } from "../components/tags"
import LivePlaceholder from "../components/live-placeholder"

import { GatsbyImage } from "gatsby-plugin-image"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulNavigation(name: { eq: "Placeholder Nav" }) {
        id
        mainLinks {
          navLinkText
          slug
          name
        }
        name
      }
      allContentfulBlogPost(sort: { publishedDate: DESC }) {
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
                resizingBehavior: NO_CHANGE
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

  const today = new Date()

  const [filteredEdges, setFilteredEdges] = useState(
    edges.filter(
      edge =>
        edge.node.slug !== "demo-post" && new Date(edge.node.fullDate) <= today
    )
  )

  const [selectedTag, setSelectedTag] = useState("all")

  // let filteredEdges = edges.filter(edge => edge.node.slug !== "demo-post")
  // Filter out posts to be published in the future .filter(edge => new Date(edge.node.fullDate) <= new Date())

  const rawEdges = edges.filter(edge => edge.node.slug !== "demo-post")

  let allTags = ["all"]

  rawEdges.forEach(edge => {
    edge.node.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag)
      }
    })
  })

  if (allTags.length === 1) {
    allTags = []
  }

  const handleTagClick = tag => {
    if (tag === "all" || tag === selectedTag) {
      setFilteredEdges(rawEdges)
      setSelectedTag("all")
    } else {
      let tempEdges = rawEdges.filter(edge => {
        return edge.node.tags.includes(tag)
      })

      setFilteredEdges(tempEdges)
      setSelectedTag(tag)
    }
  }

  /*   return process.env.GATSBY_ENVIRONMENT === "live" ? (
    <LivePlaceholder />
  ) : (
    <Layout navSettings={data?.contentfulNavigation}>
      <Seo title="Blog" />
      <div className="row mt-4 px-md-2">
        <div className="col-12 col-lg-12 p-md-0">
          <div className="row mb-0 mb-md-5 p-0">
            <div className="col-md-10 offset-md-1 standard-container-padding">
              <h1 className="block__heading">Blog Posts</h1>
            </div>
            <div className="col-md-10 offset-md-1 standard-container-padding">
              <div className="row">
                {allTags.length > 0 && (
                  <div className="blog-list-tags">
                    {allTags.map((tag, index) => {
                      return (
                        <button
                          onClick={() => handleTagClick(tag)}
                          className={`${
                            selectedTag === tag ? "selected-tag" : null
                          } ${index === 0 && "blog-list-tag-start"} ${
                            index + 1 === allTags.length && "blog-list-tag-end"
                          }`}
                          key={tag}
                        >
                          <Tag tag={tag} disabledClass={false} key={tag} />
                        </button>
                      )
                    })}
                  </div>
                )}
                {filteredEdges.map((post, index) => {
                  return (
                    <div
                      className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0"
                      key={index}
                    >
                      <Link
                        to={`/blog/${post.node.slug}`}
                        className="gallery-link"
                      >
                        <div className="">
                          <div className="position-relative">
                            {post.node.featuredImage && (
                              <GatsbyImage
                                className=""
                                imgStyle={{ borderRadius: ".25rem" }}
                                image={post.node.featuredImage.gatsbyImageData}
                                alt={post.node.title}
                              />
                            )}

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
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  ) */

  return (
    <Layout navSettings={data?.contentfulNavigation}>
      <Seo title="Blog" />
      <div className="row mt-4">
        <div className="col-12 p-0">
          <div className="col-md-10 offset-md-1 standard-container-padding">
            <h1 className="block__heading">Blog Posts</h1>
          </div>
          <div className="col-md-10 offset-md-1 standard-container-padding">
            <div className="row">
              {allTags.length > 0 && (
                <div className="blog-list-tags">
                  {allTags.map((tag, index) => {
                    return (
                      <button
                        onClick={() => handleTagClick(tag)}
                        className={`${
                          selectedTag === tag ? "selected-tag" : null
                        } ${index === 0 && "blog-list-tag-start"} ${
                          index + 1 === allTags.length && "blog-list-tag-end"
                        }`}
                        key={tag}
                      >
                        <Tag tag={tag} disabledClass={false} key={tag} />
                      </button>
                    )
                  })}
                </div>
              )}
              {filteredEdges.map((post, index) => {
                return (
                  <div
                    className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0"
                    key={index}
                  >
                    <Link
                      to={`/blog/${post.node.slug}`}
                      className="gallery-link"
                    >
                      <div className="">
                        <div className="position-relative">
                          {post.node.featuredImage && (
                            <GatsbyImage
                              className=""
                              imgStyle={{ borderRadius: ".25rem" }}
                              image={post.node.featuredImage.gatsbyImageData}
                              alt={post.node.title}
                            />
                          )}

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
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
