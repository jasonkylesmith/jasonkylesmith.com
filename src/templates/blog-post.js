import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/tags"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Blockquote from "../components/blockquote"
import PostNav from "../components/post-nav"
import Author from "../components/author"

import ShareButtons from "../components/share-buttons"
import BlockGallery from "../components/block-gallery"

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
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData(
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            title
            description
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

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (
          node.content.some(element => {
            return element.nodeType === "embedded-entry-inline"
          })
        ) {
          return children
        } else {
          return (
            <div className="blog-paragraph">
              <p>{children}</p>
            </div>
          )
        }
      },
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="">{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className="">{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5 className="">{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6 className="">{children}</h6>,
      [BLOCKS.QUOTE]: (node, children) => (
        <div className="blockquote align-self-center m-0 mb-4">
          <Blockquote quote={children} />
        </div>
      ),
      [BLOCKS.OL_LIST]: (node, children) => <ol className="">{children}</ol>,
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="">{children}</ul>
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li className="">{children}</li>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return (
          <>
            <GatsbyImage
              image={node.data.target.gatsbyImageData}
              alt={node.data.target.title}
              className="blog-image"
            />
            {node.data.target.description !== "" && (
              <p className="blog-image-caption">
                {node.data.target.description}
              </p>
            )}
          </>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const { __typename } = node.data.target

        if (__typename === "ContentfulImage") {
          const { float, image, title } = node.data.target
          const { gatsbyImageData, description } = image

          return (
            <div className={` ${float}`}>
              <GatsbyImage
                image={gatsbyImageData}
                alt={title}
                className={`blog-image`}
              />
              {description !== "" && (
                <p className="blog-image-caption">{description}</p>
              )}
            </div>
          )
        }
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const target = node.data.uri
          .toLowerCase()
          .includes("jasonkylesmith.com")
          ? "_self"
          : "_blank"

        return (
          <a href={node.data.uri} className="" target={target}>
            {node.content[0].value}
          </a>
        )
      },
    },
    renderText: text => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
    },
  }

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
        <div className="col-md-8 offset-md-2">
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
              <div className="mb-4">
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
