import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { textRender } from "./helpers/richTextRenderHelper"

const BlockStory = props => {
  const { imageFloat, image, text } = props.block
  const { gatsbyImageData, description } = image

  return (
    <div className={`block-${imageFloat}-float`}>
      <GatsbyImage
        image={gatsbyImageData}
        alt={description}
        className="main-img"
      />
      <div>{textRender(text)}</div>
    </div>
  )
}

export default BlockStory
