import React, { useEffect, useMemo, useRef, useState } from "react"
import Gallery from "react-photo-gallery"

import LightboxContainer from "./lightbox-display"

/* TODO

[ ] Transition for changes of images
[X] Left and Right arrow icons in LightboxContainer
[X] Handle swiping on mobile
[X] Height of horizontal images should be same as for vertical images
[X] On mobile, reduce max-width to allow arrows to show on screen
[ ] Smartly handle image sizes to reduce load times, 
        potentially get rid of one or all hidden preload images\
[X] Memoize creation of photoArray
[X] Add ability to customize amount of gallery rows

*/

const BlockGallery = props => {
  const [openLightbox, setOpenLightbox] = useState(false)
  const [imgIndex, setImgIndex] = useState()
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const imgIndexRef = useRef(0)

  const { images, columns } = props.block

  useEffect(() => {
    const getInnerWidth = () => {
      setInnerWidth(window.innerWidth)
    }

    window.addEventListener("resize", () => getInnerWidth(), true)

    return () =>
      window.removeEventListener("resize", () => getInnerWidth(), true)
  }, [])

  /*   const customSizes = ["(min-width: 480px) 10vw,(min-width: 1024px) 10vw,10vw"]

  const altSizes = ["12vw"] */

  /* let maxItems = 5000
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
  } */

  /*   let photoArray = []
  photoArray = images.map((image, index) => {
    const { url } = image.file
    const { height, width } = image.file.details.image
    const { srcSet, sizes } = image.gatsbyImageData.images.sources[0]
    const { description } = image

    return {
      src: `https:${url}`,
      height: height,
      width: width,
      srcSet,
      sizes,
      alt: description,

      index,
      key: `${index}-${url}`,
    }
  }) */

  const photoArray = useMemo(() => {
    const buildPhotoArray = () => {
      return images.map((image, index) => {
        const { url } = image.file
        const { height, width } = image.file.details.image
        const { srcSet, sizes } = image.gatsbyImageData.images.sources[0]
        const { description } = image

        return {
          src: `https:${url}`,
          height: height,
          width: width,
          srcSet,
          sizes,
          alt: description,

          index,
          key: `${index}-${url}`,
        }
      })
    }

    return buildPhotoArray()
  }, [images])

  /*   let galleryClass
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
  } */

  /*   const imgOnClick = img => {
    setLightboxImg(img.nativeEvent.target.src)
    setOpenLightbox(true)
  } */

  const moveImgIndex = direction => {
    if (direction === "left" && imgIndexRef.current > 0) {
      // setImgIndex(imgIndexRef - 1)
      imgIndexRef.current = imgIndexRef.current - 1
      setImgIndex(imgIndexRef.current)
    }

    if (direction === "right" && imgIndexRef.current < photoArray?.length - 1) {
      // setImgIndex(imgIndexRef + 1)
      imgIndexRef.current = imgIndexRef.current + 1
      setImgIndex(imgIndexRef.current)
    }
  }

  return (
    <div
      style={{
        margin: "-.5rem",
        overflowX: "hidden",
      }}
    >
      <LightboxContainer
        images={photoArray}
        openLightbox={openLightbox}
        setOpenLightbox={setOpenLightbox}
        moveImgIndex={moveImgIndex}
        imgIndex={imgIndex}
      />

      <Gallery
        photos={photoArray}
        direction={"column"}
        margin={10}
        columns={
          columns
            ? innerWidth > 992
              ? columns
              : innerWidth > 500
              ? Math.round(columns / 2)
              : 1
            : undefined
        }
        onClick={(event, photos) => {
          imgIndexRef.current = photos.index
          setImgIndex(photos.index)

          setOpenLightbox(true)
        }}
      />

      {/* <div className="gallery-test">
        <div className="gallery-test--container">
          {photoArray.map(photo => {
            const isVertical = photo.width < photo.height ? true : false

            return (
              <div className="item">
                <div className="inner-item">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={isVertical ? "vertical" : "horizontal"}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div> */}

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
