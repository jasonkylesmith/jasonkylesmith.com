import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { motion } from "framer-motion"
import IconList from "./icon-list"
import MarkdownDisplay from "./markdown-display"
import ContactForm from "./contact-form"
import BlockGallery from "./block-gallery"

import {
  initialCenter,
  initialLeft,
  initialRight,
  whileInViewCenter,
  whileInViewLeft,
  whileInViewRight,
} from "../helpers/constants"

const SplitContent = ({ module, parentFullWidth, hasBackgroundImage }) => {
  const {
    blocks,
    ratio,
    verticalAlignment,
    fullWidth,
    isHero,
    isMobileReversed,
  } = module

  const numOfBlocks = blocks.length

  let leftClasses
  let rightClasses
  let soloClasses

  if (numOfBlocks === 1) {
    soloClasses = `col-12 display-flex ${!fullWidth && "col-md-10 offset-md-1"}`
  } else {
    if (ratio === "equal") {
      leftClasses = "col-12 col-md-6"
      rightClasses = "col-12 col-md-6"
    } else if (ratio === "left-larger") {
      leftClasses = "col-12 col-md-6 col-lg-8"
      rightClasses = "col-12 col-md-6 col-lg-4"
    } else {
      leftClasses = "col-12 col-md-6 col-lg-4"
      rightClasses = "col-12 col-md-6 col-lg-8"
    }
  }

  leftClasses +=
    blocks[0]?.sys?.contentType?.sys?.id === "image"
      ? " left"
      : " pb-4 pb-md-0 pe-md-4 left"
  rightClasses +=
    blocks[1]?.sys?.contentType?.sys?.id === "image"
      ? " pb-4 pb-md-0 right"
      : " ps-md-4 pb-4 pb-md-0 right"

  const BlockWrapper = ({ block, side }) => {
    const { id } = block.sys.contentType.sys

    const textAlign = block?.textAlign ? block.textAlign : "start"

    if (id === "copy") {
      return (
        <div
          className={`copy-wrapper d-flex ${
            numOfBlocks !== 0 && "justify-content-center"
          } ${
            verticalAlignment === "center" && "align-items-center"
          } text-md-${textAlign} ${numOfBlocks === 1 && "solo-text"} ${
            numOfBlocks === 1 && ratio === "right-larger"
              ? "solo-small"
              : ratio === "left-larger"
              ? "solo-medium"
              : ""
          } ${isHero && "hero-copy"} ${
            side === "right" && "pe-0 ps-0 ps-md-0"
          } ${parentFullWidth && "pe-3 ps-3 ps-md-0"} ${
            hasBackgroundImage && !isHero && "white-background"
          }`}
          style={block?.textColor === "light" ? { color: "#f7f7f7" } : {}}
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
        <div
          className={`ps-md-4 w-100 pt-4 pt-lg-0  ${
            parentFullWidth && "pe-3 ps-3"
          }`}
        >
          <ContactForm module={block} />
        </div>
      )
    }

    if (id === "blockGallery") {
      if (block.orientation === "row") {
        return <BlockGallery block={block} />
      } else {
        return <></>
      }
    }

    return <></>
  }

  return (
    <div
      className={`col-12 ${isHero && `d-flex align-items-center`}`}
      style={hasBackgroundImage ? { padding: "1rem 0" } : {}}
    >
      {/* <div className={`${parentFullWidth && "col-12 col-md-8 offset-md-2"}`}> */}
      <div
        className={`split-content row gap-4 gap-md-0 mx-0 ${
          verticalAlignment === "center" && "align-center"
        } ${hasBackgroundImage && "background-image"}`}
      >
        {numOfBlocks === 1 ? (
          <motion.div
            className={`${soloClasses} content-container`}
            style={hasBackgroundImage ? { height: "100%" } : {}}
            initial={initialCenter}
            whileInView={whileInViewCenter}
          >
            <BlockWrapper block={blocks[0]} side="center" />
          </motion.div>
        ) : (
          <>
            <motion.div
              className={`${leftClasses} content-container ${
                blocks[0].sys.contentType.sys.id === "copy" && "copy-trigger"
              } ${isMobileReversed && "order-1 order-md-0"}`}
              style={hasBackgroundImage ? { height: "100%" } : {}}
              initial={initialLeft}
              whileInView={whileInViewLeft}
            >
              <BlockWrapper block={blocks[0]} side="left" />
            </motion.div>
            <motion.div
              className={`${rightClasses} content-container ${
                blocks[1].sys.contentType.sys.id === "copy" && "copy-trigger"
              } ${isMobileReversed && "order-0 order-md-1"}`}
              style={hasBackgroundImage ? { height: "100%" } : {}}
              initial={initialRight}
              whileInView={whileInViewRight}
            >
              <BlockWrapper block={blocks[1]} side="right" />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default SplitContent
