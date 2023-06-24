import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { textRender } from "./helpers/richTextRenderHelper"

const BlockFeature = props => {
  const { blockItems, variant } = props.block

  let maxItems

  let blockClasses

  switch (variant) {
    case "Portrait Solo":
      maxItems = 1
      blockClasses = "col-12"
      break
    case "Portrait Duo":
      maxItems = 2
      blockClasses = "col-12 col-md-6 mb-4"
      break
    case "Portrait Trio":
      maxItems = 3
      blockClasses = "col-12 col-sm-6 col-md-4 mb-4"
      break
    case "Landscape Solo":
      maxItems = 1
      blockClasses = "col-12"
      break
    case "Landscape Duo":
      maxItems = 2
      blockClasses = "col-12"
      break
    case "Landscape Trio":
      maxItems = 3
      blockClasses = "col-12"
      break
    default:
  }

  return (
    <div className={`row justify-content-around align-items-center`}>
      {blockItems.map((item, index) => {
        const { id } = item.sys.contentType.sys

        if (index < maxItems) {
          if (id === "blockItemImage") {
            return (
              <BlockImage
                item={item}
                key={item.id}
                blockClasses={blockClasses}
              />
            )
          }
          if (id === "blockItemText") {
            return (
              <BlockText
                item={item}
                key={item.id}
                blockClasses={blockClasses}
              />
            )
          }
        }

        return <></>
      })}
    </div>
  )
}

const BlockImage = props => {
  const { blockClasses } = props
  const { image, description, includeCaption, caption } = props.item
  const { gatsbyImageData } = image

  return (
    <div className={`${blockClasses} mb-4`}>
      <GatsbyImage image={gatsbyImageData} alt={description} />
      {includeCaption && <span>{caption}</span>}
    </div>
  )
}

const BlockText = props => {
  const { blockClasses } = props
  const { text } = props.item

  return (
    <div className={`${blockClasses} align-self-start`}>{textRender(text)}</div>
  )
}

export default BlockFeature
