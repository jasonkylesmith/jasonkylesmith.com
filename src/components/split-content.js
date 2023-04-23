import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import IconList from "./icon-list"
import MarkdownDisplay from "./markdown-display"

const SplitContent = ({ module, parentFullWidth }) => {
  const { blocks, ratio } = module

  const numOfBlocks = blocks.length

  let leftClasses
  let rightClasses
  let soloClasses

  if (numOfBlocks === 1) {
    soloClasses = "col-12 display-flex justify-content-center text-center"
  } else {
    if (ratio === "equal") {
      leftClasses = "col-12 col-md-6"
      rightClasses = "col-12 col-md-6"
    } else if (ratio === "left-larger") {
      leftClasses = "col-12 col-md-8"
      rightClasses = "col-12 col-md-4"
    } else {
      leftClasses = "col-12 col-md-4"
      rightClasses = "col-12 col-md-8"
    }
  }

  leftClasses += " pe-md-4"
  rightClasses += " ps-md-4"

  const BlockWrapper = ({ block }) => {
    const { id } = block.sys.contentType.sys

    if (id === "copy") {
      return (
        <div className={`copy-wrapper py-2`}>
          <MarkdownDisplay props={block.text.childrenMarkdownRemark[0]} />
        </div>
      )
    }
    if (id === "image") {
      const { gatsbyImageData, description } = block.image

      return (
        <div className="image-wrapper">
          <GatsbyImage image={gatsbyImageData} alt={description} />
        </div>
      )
    }

    if (id === "iconList") {
      return <IconList module={block} isSplitContent />
    }

    return <></>
  }

  return (
    <div className={`${parentFullWidth && "col-12 col-md-8 offset-md-2"}`}>
      <div className={`split-content row`}>
        {numOfBlocks === 1 ? (
          <div className={`${soloClasses} content-container`}>
            <BlockWrapper block={blocks[0]} />
          </div>
        ) : (
          <>
            <div className={`${leftClasses} content-container`}>
              <BlockWrapper block={blocks[0]} />
            </div>
            <div className={`${rightClasses} content-container pe-md-`}>
              <BlockWrapper block={blocks[1]} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SplitContent
