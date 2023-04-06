import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Blockquote from "../blockquote"

const richTextRenderOptions = {
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
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mt-4 mb-0">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mt-4 mb-0">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="mt-4 mb-0">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="mt-4 mb-0">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="mt-4 mb-0">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="mt-4 mb-0">{children}</h6>
    ),
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
            <p className="blog-image-caption">{node.data.target.description}</p>
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
      const target = node.data.uri.toLowerCase().includes("jasonkylesmith.com")
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

export default richTextRenderOptions
