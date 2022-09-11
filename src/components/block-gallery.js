import React, { useState } from "react"
import Gallery from "react-photo-gallery"

import LightboxContainer from "./lightbox-display"

const BlockGallery = props => {
  const [openLightbox, setOpenLightbox] = useState(false)
  const [lightboxImg, setLightboxImg] = useState("")
  const [lightboxImgSiblings, setLightboxImgSiblings] = useState({})

  const { images, variant } = props.block

  const customSizes = ["(min-width: 480px) 10vw,(min-width: 1024px) 10vw,10vw"]

  const altSizes = ["12vw"]

  let maxItems = 5000
  let columns = 3

  switch (variant) {
    case "All Small":
      columns = 6
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
    const { description } = image

    return {
      // src: `https:${url}`,
      height: height,
      width: width,
      srcSet,
      sizes,
      alt: description,
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

  const imgOnClick = img => {
    setLightboxImg(img.nativeEvent.target.src)
    setOpenLightbox(true)
  }

  const imgOnClickString = img => {
    setLightboxImg(img)
    setOpenLightbox(true)
  }

  // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

  /* use a description to allow a component to query graphql for an image based on unique description. Contentful will have to have unique descriptions for each image for this to work. */

  return (
    <div
      style={{
        margin: "-.5rem",
      }}
    >
      <LightboxContainer
        image={lightboxImg}
        openLightbox={openLightbox}
        setOpenLightbox={setOpenLightbox}
        setLightboxImg={setLightboxImg}
        lightboxImgSiblings={lightboxImgSiblings}
      />

      <Gallery
        photos={photoArray}
        direction={"column"}
        margin={10}
        onClick={(event, index) => {
          console.log("Event", event)
          //nextSibling, previousSibling

          const srcset = event.target.srcset.split(",")
          const largest = srcset[srcset.length - 1]
          const noQuery = largest.split("?")
          imgOnClickString(noQuery[0].replace("\n", ""))

          setLightboxImgSiblings({
            prev: event.target.previousSibling
              ? event.target.previousSibling
              : null,
            next: event.target.nextSibling ? event.target.nextSibling : null,
          })
        }}
      />

      {/*       <div
        style={{
          width: "500px",
          height: "500px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-250px, -250px)",
          border: "2px solid pink",
        }}
      /> */}
    </div>
  )
}

export default BlockGallery
