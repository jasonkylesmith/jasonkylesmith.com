import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const BlockGallery = props => {
  const { images, variant } = props.block

  console.log(variant)

  let galleryClass
  let galleryWrapperClass = ""
  let maxItems = 5000

  switch (variant) {
    case "All Small":
      galleryClass = "all-small"
      break
    case "All Medium":
      galleryClass = "all-medium"
      break
    case "Extra Large Portrait":
      galleryClass = "extra-large"
      maxItems = 1
      break
    case "Extra Large Landscape":
      galleryClass = "extra-large"
      maxItems = 1
      break
    case "One Large Left Two Medium":
      galleryClass = "large-left-two-medium"
      maxItems = 3
      galleryWrapperClass = "two-to-one-wrapper"
      break
    case "One Large Right Two Medium":
      galleryClass = "large-right-two-medium"
      maxItems = 3
      galleryWrapperClass = "one-to-two-wrapper"
      break
  }

  return (
    <div className={`block-gallery-${galleryClass} block-gallery`}>
      {images.map((image, index) => {
        if (index < maxItems) {
          return (
            <div className="grid-wrapper">
              <GatsbyImage
                image={image.gatsbyImageData}
                key={images.id}
                imgClassName={`${galleryClass}-img`}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default BlockGallery
