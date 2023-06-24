import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import IconList from "./icon-list"
import MarkdownDisplay from "./markdown-display"
import ContactForm from "./contact-form"

const SplitContent = ({ module, parentFullWidth }) => {
  const { blocks, ratio, verticalAlignment, fullWidth, isHero } = module

  const numOfBlocks = blocks.length

  let leftClasses
  let rightClasses
  let soloClasses

  if (numOfBlocks === 1) {
    soloClasses = "col-12 col-md-10 offset-md-1 display-flex"
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
  rightClasses += " ps-md-4 pb-4 pb-md-0 right"

  const BlockWrapper = ({ block, side }) => {
    const { id } = block.sys.contentType.sys

    const textAlign = block?.textAlign ? block.textAlign : "start"

    if (id === "copy") {
      return (
        <div
          className={`copy-wrapper text-md-${textAlign} ${
            numOfBlocks === 1 && "solo-text px-4"
          } ${isHero && "hero-copy"} ${
            side === "right" && "pe-4 ps-4 ps-md-0"
          }`}
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
      return (
        <div className="ps-md-4  w-100">
          <ContactForm module={block} />
        </div>
      )
    }

    return <></>
  }

  return (
    <div className={`col-12`}>
      {/* <div className={`${parentFullWidth && "col-12 col-md-8 offset-md-2"}`}> */}
      <div
        className={`split-content row gap-4 gap-md-0 mx-0 ${
          verticalAlignment === "center" && "align-center"
        }`}
      >
        {numOfBlocks === 1 ? (
          <div className={`${soloClasses} content-container`}>
            <BlockWrapper block={blocks[0]} side="center" />
          </div>
        ) : (
          <>
            <div
              className={`${leftClasses} content-container ${
                blocks[0].sys.contentType.sys.id === "copy" && "copy-trigger"
              }`}
            >
              <BlockWrapper block={blocks[0]} side="left" />
            </div>
            <div
              className={`${rightClasses} content-container ${
                blocks[1].sys.contentType.sys.id === "copy" && "copy-trigger"
              }`}
            >
              <BlockWrapper block={blocks[1]} side="right" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SplitContent
