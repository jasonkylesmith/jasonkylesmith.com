import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Gallery from "react-photo-gallery"
import GalleryImage from "./gallery-image"

const BlockGallery = props => {
  const { images, variant } = props.block

  const customSizes = ["(min-width: 480px) 10vw,(min-width: 1024px) 10vw,10vw"]

  const altSizes = ["12vw"]

  let maxItems = 5000
  let columns = 3

  switch (variant) {
    case "All Small":
      columns = 5
      break
    case "All Medium":
      break
    case "Extra Large Portrait":
      maxItems = 1
      columns = 1
      break
    case "Extra Large Landscape":
      maxItems = 1
      columns = 1
      break
    case "One Large Left Two Medium":
      maxItems = 3
      columns = 2
      break
    case "One Large Right Two Medium":
      maxItems = 3
      columns = 2
      break
    default:
  }

  let photoArray = []
  photoArray = images.map(image => {
    const { url } = image.file
    const { height, width } = image.file.details.image
    const { srcSet, sizes } = image.gatsbyImageData.images.sources[0]

    return {
      // src: `https:${url}`,
      height: height / 2,
      width: width / 2,
      srcSet,
      sizes,
    }
  })

  let galleryClass
  let galleryWrapperClass = ""

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
    default:
  }

  return (
    <div
      style={{
        margin: "-.5rem",
      }}
    >
      <Gallery photos={photoArray} direction={"column"} margin={10} />
      {/* <div className={`${galleryClass} block-gallery-grid`}>
     
      {images.map(image => {
        const { height, width } = image.file.details.image
        const imgAspect =
          height > width ? "portrait" : height < width ? "landscape" : "square"

        return (
          <div className={`block-gallery-wrapper-${galleryClass}`}>
            <GatsbyImage
              image={image.gatsbyImageData}
              key={images.id}
              imgClassName={`block-gallery-img`}
              className={`block-gallery-item ${imgAspect}`}
              objectPosition="50% 50%"
            />
          </div>
        )
      })}
    </div> */}
    </div>
  )
}

export default BlockGallery
