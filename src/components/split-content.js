import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import IconList from "./icon-list"
import MarkdownDisplay from "./markdown-display"
import ContactForm from "./contact-form"

const SplitContent = ({ module, parentFullWidth }) => {
  const { blocks, ratio, verticalAlignment, fullWidth } = module

  const numOfBlocks = blocks.length

  let leftClasses
  let rightClasses
  let soloClasses

  if (numOfBlocks === 1) {
    soloClasses = "col-12 display-flex px-3 "
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

  leftClasses += " pe-md-4 left"
  rightClasses += " ps-md-4 right"

  const BlockWrapper = ({ block }) => {
    const { id } = block.sys.contentType.sys

    if (id === "copy") {
      return (
        <div
          className={`copy-wrapper py-2 ${numOfBlocks === 1 && "solo-text"}`}
        >
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

    if (id === "contactForm") {
      return <ContactForm module={block} />
    }

    return <></>
  }

  return (
    <div className={`col-12`}>
      {/* <div className={`${parentFullWidth && "col-12 col-md-8 offset-md-2"}`}> */}
      <div
        className={`split-content row px-3 px-md-0 ${
          verticalAlignment === "center" && "align-center"
        }`}
      >
        {numOfBlocks === 1 ? (
          <div className={`${soloClasses} content-container`}>
            <BlockWrapper block={blocks[0]} />
          </div>
        ) : (
          <>
            <div className={`${leftClasses} content-container`}>
              <BlockWrapper block={blocks[0]} />
            </div>
            <div className={`${rightClasses} content-container`}>
              <BlockWrapper block={blocks[1]} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SplitContent
