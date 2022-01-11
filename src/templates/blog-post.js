import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/tags"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import Blockquote from "../components/blockquote"

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      tags
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        title
        gatsbyImageData(
          width: 1000
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
      body {
        raw
        references {
          __typename
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData(
              width: 1000
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            title
          }
        }
      }
    }
  }
`

const BlogPost = props => {
  const { title, publishedDate, featuredImage, tags, body } =
    props.data.contentfulBlogPost

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="">{children}</p>,
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
          <GatsbyImage
            image={node.data.target.gatsbyImageData}
            alt={node.data.target.title}
            className="blog-image"
          />
        )
      },
      [INLINES.EMBEDDED_ENTRY]: node => {
        console.log("Embedded Entry: ", node)
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <a href={node.data.uri} className="">
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
      <SEO title={title} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-1 mt-4 mt-md-0">
            <h1 className="blog-title">{title}</h1>
            <span className="blog-date">{publishedDate}</span>

            {featuredImage && (
              <GatsbyImage
                className="blog-featured"
                image={featuredImage.gatsbyImageData}
                alt={title}
              />
            )}
            <div className="blog-tags">
              <Tags tags={tags} disabled />
            </div>
            <div className="blog-body d-flex flex-column">{bodyContent}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
