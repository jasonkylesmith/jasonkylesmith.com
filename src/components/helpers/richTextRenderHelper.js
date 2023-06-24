import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Blockquote from "../blockquote"

export const textRender = raw => {
  return renderRichText(raw, renderOptions)
}

export const renderOptions = {
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
            <p className="blog-image-caption">{node.data.target.description}</p>
          )}
        </>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: node => {},
    [INLINES.HYPERLINK]: (node, children) => {
      let url = node.data.uri
      let urlArr
      let linkType = "_blank"

      if (url.slice(0, 5) === "https") {
        url = url.substring(8)
      }

      if (url.slice(0, 4) === "http") {
        url = url.substring(7)
      }

      urlArr = url.split("/")
      if (
        urlArr[0] === "www.jasonkylesmith.com" ||
        urlArr[0] === "jasonkylesmith.com"
      ) {
        linkType = "_self"
      }

      return (
        <a href={node.data.uri} className="" target={linkType}>
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
