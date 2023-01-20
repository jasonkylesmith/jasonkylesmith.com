import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
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
      leftClasses = "col-12 col-md-7"
      rightClasses = "col-12 col-md-5"
    } else {
      leftClasses = "col-12 col-md-5"
      rightClasses = "col-12 col-md-7"
    }
  }

  const BlockWrapper = ({ block }) => {
    const { id } = block.sys.contentType.sys

    if (id === "copy") {
      return (
        <div className={`copy-wrapper px-3 py-2`}>
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

    return <></>
  }

  return (
    <div className="col-12 col-md-8 offset-md-2">
      <div className={`split-content row px-3`}>
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
