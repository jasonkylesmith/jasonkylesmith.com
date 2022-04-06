import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { textRender } from "./helpers/richTextRenderHelper"

const BlockFeature = props => {
  const { blockItems, variant } = props.block

  let maxItems

  switch (variant) {
    case "Portrait Duo":
      maxItems = 2
      break
  }

  return (
    <div className={`block-feature`}>
      {blockItems.map((item, index) => {
        const { id } = item.sys.contentType.sys

        if (index < maxItems) {
          if (id === "blockItemImage") {
            return <BlockImage item={item} key={item.id} />
          }
          if (id === "blockItemText") {
            return <BlockText item={item} key={item.id} />
          }
        }

        return <></>
      })}
    </div>
  )
}

const BlockImage = props => {
  const { image, description } = props.item
  const { gatsbyImageData } = image

  return <GatsbyImage image={gatsbyImageData} alt={description} />
}

const BlockText = props => {
  const { text } = props.item

  return textRender(text)
}

export default BlockFeature
