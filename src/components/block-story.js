import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const BlockStory = props => {
  const { imageFloat, image, text } = props.block
  const { gatsbyImageData, description } = image

  return (
    <div className="block-left-float">
      <GatsbyImage
        image={gatsbyImageData}
        alt={description}
        className="main-img"
      />
      <div>
        <h2>Header 2 Title</h2>
      </div>
    </div>
  )
}

export default BlockStory
