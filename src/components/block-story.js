import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { textRender } from "./helpers/richTextRenderHelper"

const BlockStory = props => {
  const { imageFloat, image, text } = props.block
  const { gatsbyImageData, description } = image

  return (
    <div className={`block-${imageFloat}-float row mt-4 mb-4`}>
      <div className="col-12">
        <div className="text-center">
          <GatsbyImage
            image={gatsbyImageData}
            alt={description}
            className={`main-img text-center ${
              imageFloat === "left" ? "float-sm-start" : "float-sm-end"
            }`}
          />
        </div>
        <div className="order-1 order-sm-2">{textRender(text)}</div>
      </div>
    </div>
  )
}

export default BlockStory
