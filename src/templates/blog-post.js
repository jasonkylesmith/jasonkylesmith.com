import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
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
        <div className="">
          <blockquote>{children}</blockquote>
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
            className=""
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

  const bodyContent = renderRichText(
    props.data.contentfulBlogPost.body,
    renderOptions
  )

  console.log("Data: ", bodyContent)

  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulBlogPost.publishedDate}
        </span>

        {props.data.contentfulBlogPost.featuredImage && (
          <GatsbyImage
            className="featured"
            image={props.data.contentfulBlogPost.featuredImage.gatsbyImageData}
            alt={props.data.contentfulBlogPost.title}
          />
        )}

        <div>
          <h1>Post Body</h1>
          {bodyContent}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
