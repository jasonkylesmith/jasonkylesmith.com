import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/tags"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import PostNav from "../components/post-nav"
import Author from "../components/author"

import ShareButtons from "../components/share-buttons"
import BlockGallery from "../components/block-gallery"
import richTextRenderOptions from "../components/helpers/richTextRenderOptions"

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      contentful_id
      slug
      title
      tags
      gallery {
        __typename
        ... on ContentfulBlockGallery {
          id
          name
          columns
          images {
            id
            description
            gatsbyImageData(
              breakpoints: [200, 400, 600, 800, 1000, 1600]
              sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
              quality: 100
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
      excerpt {
        excerpt
      }
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        title
        file {
          url
        }
        gatsbyImageData(
          quality: 100
          layout: CONSTRAINED
          resizingBehavior: CROP
          aspectRatio: 2.5
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
      body {
        raw
        references {
          __typename
          ... on ContentfulImage {
            contentful_id
            __typename
            id
            name
            float
            image {
              gatsbyImageData
              file {
                url
                details {
                  image {
                    height
                    width
                  }
                }
              }
              title
              description
            }
          }
        }
      }
    }
    allContentfulBlogPost(
      filter: { slug: { ne: "demo-post" } }
      sort: { fields: publishedDate }
    ) {
      edges {
        next {
          slug
          title
          contentful_id
        }
        previous {
          slug
          title
          contentful_id
        }
        node {
          slug
          contentful_id
        }
      }
    }
  }
`

const BlogPost = props => {
  const {
    title,
    publishedDate,
    featuredImage,
    tags,
    body,
    contentful_id,
    slug,
    excerpt,
    gallery,
  } = props.data.contentfulBlogPost

  const { edges } = props.data.allContentfulBlogPost

  const currentEdge = edges.filter(
    edge => edge.node.contentful_id === contentful_id
  )

  const navEdges = { prev: currentEdge[0].previous, next: currentEdge[0].next }

  const renderOptions = richTextRenderOptions

  const bodyContent = renderRichText(body, renderOptions)

  return (
    <Layout>
      <Seo
        title={title}
        url={`https://www.jasonkylesmith.com/blog/${slug}`}
        description={excerpt.excerpt}
        photo={featuredImage?.file?.url}
      />

      <div className="row mt-4 px-2">
        <div className="col-md-10 offset-md-1">
          {featuredImage && (
            <div className="w-100 d-flex position-relative">
              <GatsbyImage image={featuredImage.gatsbyImageData} alt={title} />
            </div>
          )}
          <h1 className="blog-title block__heading">{title}</h1>
          <div className="d-flex direction-row align-items-center">
            <span className="blog-date">{publishedDate}</span>
            <Tags tags={tags} />

            <ShareButtons
              title={title}
              slug={slug}
              directory={"blog"}
              sources={["Facebook", "Twitter", "Email", "Clipboard"]}
            />
          </div>

          <div className="blog-body">
            {bodyContent}
            {gallery && gallery.__typename === "ContentfulBlockGallery" && (
              <div className="my-4">
                <BlockGallery block={gallery} key={gallery.id} />
              </div>
            )}
            <div className="medium" />
            <Author />
            {/* <div className="ending" /> */}
            <PostNav edges={navEdges} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
