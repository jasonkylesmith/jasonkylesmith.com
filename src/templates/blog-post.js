import React from "react"
import { graphql, Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import Tags from "../components/tags"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import Blockquote from "../components/blockquote"
import PostNav from "../components/post-nav"

library.add(fab, fas)

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      contentful_id
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
  const { title, publishedDate, featuredImage, tags, body, contentful_id } =
    props.data.contentfulBlogPost

  const { edges } = props.data.allContentfulBlogPost

  const currentEdge = edges.filter(
    edge => edge.node.contentful_id === contentful_id
  )

  const navEdges = { prev: currentEdge[0].previous, next: currentEdge[0].next }

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
      [INLINES.EMBEDDED_ENTRY]: node => {},
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
            <FontAwesomeIcon icon={["fas", "chevron-left"]} size="sm" />{" "}
            <Link to="/blog/">Blog</Link>
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
            <div className="blog-body d-flex flex-column">
              {bodyContent}
              <PostNav edges={navEdges} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
