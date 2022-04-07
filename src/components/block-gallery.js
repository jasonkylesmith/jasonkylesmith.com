import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Gallery from "react-photo-gallery"

const BlockGallery = props => {
  const { images, variant } = props.block
  const customSizes = [
    "(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw",
  ]

  let photoArray = []
  photoArray = images.map(image => {
    const { url } = image.file
    const { height, width } = image.file.details.image
    const { srcSet, sizes } = image.gatsbyImageData.images.sources[0]
    console.log(srcSet)

    return {
      src: `https:${url}`,
      height: height / 2,
      width: width / 2,
      srcSet,
      customSizes,
    }
  })

  console.log(photoArray)

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
    default:
  }

  return (
    <>
      <Gallery
        photos={photoArray}
        direction={"column"}
        margin={10}
        columns={5}
      />
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
    </>
  )
}

export default BlockGallery
