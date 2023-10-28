import React from "react"
import { Link, graphql } from "gatsby"

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
      nav {
        mainLinks {
          name
          navLinkText
          slug
        }
      }
      gallery {
        __typename
        ... on ContentfulBlockGallery {
          id
          name
          columns
          orientation
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
          resizingBehavior: NO_CHANGE
          aspectRatio: 2.5
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
      recommended {
        slug
        id
        excerpt {
          childMarkdownRemark {
            html
          }
        }
        title
        featuredImage {
          title
          file {
            url
          }
          gatsbyImageData(
            quality: 100
            layout: CONSTRAINED
            resizingBehavior: NO_CHANGE
            aspectRatio: 1.77
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
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
      sort: { publishedDate: ASC }
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
          featured
          title
          id
          featuredImage {
            title
            file {
              url
            }
            gatsbyImageData(
              quality: 100
              layout: CONSTRAINED
              resizingBehavior: NO_CHANGE
              aspectRatio: 1.77
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
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
    nav,
    recommended,
  } = props.data.contentfulBlogPost

  const { edges } = props.data.allContentfulBlogPost

  const currentEdge = edges.filter(
    edge => edge.node.contentful_id === contentful_id
  )

  const featuredEdge = edges.filter(
    edge =>
      edge.node.featured === "yes" && edge.node.id !== currentEdge[0].node.id
  )

  const navEdges = { prev: currentEdge[0].previous, next: currentEdge[0].next }

  const renderOptions = richTextRenderOptions

  const bodyContent = renderRichText(body, renderOptions)

  const filteredRecommended = recommended?.filter(
    post => post.id !== featuredEdge[0]?.node.id
  )

  return (
    <Layout navSettings={nav}>
      <Seo
        title={title}
        url={`https://www.jasonkylesmith.com/blog/${slug}/`}
        description={excerpt.excerpt}
        photo={featuredImage?.file?.url}
      />

      <div className="row mt-4">
        <div className="col-md-10 offset-md-1 p-2 p-md-0">
          {featuredImage && (
            <div className="w-100 d-flex position-relative">
              <GatsbyImage image={featuredImage.gatsbyImageData} alt={title} />
            </div>
          )}
          <h1 className="blog-title block__heading">{title}</h1>
          <div className="d-flex flex-row flex-wrap align-items-center blog-subhead-section">
            <span className="blog-date">{publishedDate}</span>
            <Tags tags={tags} />

            <ShareButtons
              title={title}
              slug={slug}
              directory={"blog"}
              sources={["Facebook", "Twitter", "Email", "Clipboard"]}
            />
          </div>
          <div className="d-flex flex-column flex-lg-row blog-post-container">
            <div>
              <div className="blog-body">
                {bodyContent}
                {gallery && gallery.__typename === "ContentfulBlockGallery" && (
                  <div className="my-4">
                    <BlockGallery block={gallery} key={gallery.id} />
                  </div>
                )}
              </div>
            </div>
            <div className="blog-sidebar-container">
              <div className="blog-sidebar">
                <div className="blog-sidebar-posts">
                  {featuredEdge && featuredEdge.length > 0 && (
                    <div>
                      <h3>Featured Post</h3>
                      <Link
                        to={`/blog/${featuredEdge[0].node.slug}`}
                        className="gallery-link"
                      >
                        <div>
                          <GatsbyImage
                            image={
                              featuredEdge[0].node.featuredImage.gatsbyImageData
                            }
                            alt={featuredEdge[0].node.title}
                            className="mb-2"
                          />

                          <h5>{featuredEdge[0].node.title}</h5>
                        </div>
                      </Link>
                    </div>
                  )}
                  {filteredRecommended && filteredRecommended.length > 0 && (
                    <div>
                      <h3>Recommended Reading</h3>

                      {filteredRecommended.map(post => {
                        return (
                          <Link
                            to={`/blog/${post.slug}`}
                            className="gallery-link mb-2"
                            key={post.slug}
                          >
                            <div>
                              <GatsbyImage
                                image={post.featuredImage.gatsbyImageData}
                                alt={post.title}
                              />

                              <h5>{post.title}</h5>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
                {((featuredEdge && featuredEdge.length > 0) ||
                  (filteredRecommended && filteredRecommended.length > 0)) && (
                  <div className="medium mb-5" />
                )}

                <Author />
              </div>
            </div>
          </div>
          <div className="medium" />

          <PostNav edges={navEdges} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
