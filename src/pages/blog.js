import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

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
            featuredImage {
              title
              gatsbyImageData(
                width: 800
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
            excerpt {
              childMarkdownRemark {
                excerpt(pruneLength: 150)
              }
            }
          }
        }
      }
    }
  `)

  const { edges } = data.allContentfulBlogPost
  const featuredPost = edges.filter(edge => edge.node.featured === "yes")[0]
    .node

  const nonFeaturedPosts = edges.filter(edge => edge.node.featured !== "yes")
  console.log(nonFeaturedPosts)

  return (
    <Layout>
      <Seo title="Blog" />

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-1 mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-center">
            <div className="align-self-start">
              <h1>Blog</h1>
            </div>

            <div className="post-featured-wrapper">
              {featuredPost && (
                <>
                  {featuredPost.featuredImage && (
                    <GatsbyImage
                      className="blog-featured"
                      image={featuredPost.featuredImage.gatsbyImageData}
                      alt={featuredPost.title}
                    />
                  )}
                  <h2 className="blog-title">{featuredPost.title}</h2>
                  <p className="excerpt">
                    {featuredPost.excerpt.childMarkdownRemark.excerpt}
                  </p>
                  <Link to={`/blog/${featuredPost.slug}`} className="btn">
                    READ MORE
                  </Link>
                </>
              )}
            </div>
            <div>
              {nonFeaturedPosts &&
                nonFeaturedPosts.map((post, index) => {
                  return (
                    <div
                      key={`${post.node.contentful_id}${index}`}
                      className="post-excerpt-wrapper"
                    >
                      <h2 className="">{post.node.title}</h2>
                      {post.node.excerpt && (
                        <p className="excerpt">
                          {post.node.excerpt.childMarkdownRemark.excerpt}
                        </p>
                      )}

                      <Link to={`/blog/${post.node.slug}`} className="btn">
                        Read More
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
