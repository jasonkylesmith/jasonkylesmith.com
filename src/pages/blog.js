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
                width: 400
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
      {featuredPost.featuredImage && (
        <GatsbyImage
          className="featured"
          image={featuredPost.featuredImage.gatsbyImageData}
          alt={featuredPost.title}
        />
      )}
      <h2>
        <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
      </h2>
      <p className="excerpt">
        {featuredPost.excerpt.childMarkdownRemark.excerpt}
      </p>

      <ul className="posts">
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className="post" key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
              <div className="meta">
                <span>Posted on {edge.node.publishedDate}</span>
              </div>
              {edge.node.featuredImage && (
                <GatsbyImage
                  className="featured"
                  image={edge.node.featuredImage.gatsbyImageData}
                  alt={edge.node.title}
                />
              )}
              <p className="excerpt">
                {edge.node.excerpt.childMarkdownRemark.excerpt}
              </p>
              <div className="button">
                <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog
