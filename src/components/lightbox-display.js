import { StaticImage } from "gatsby-plugin-image"
import React, { useEffect, useRef, useState } from "react"

// max-height and max-width for images?

const LightboxContainer = props => {
  const {
    openLightbox,
    setOpenLightbox,

    images,
    moveImgIndex,
    imgIndex,
  } = props

  const imgRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const closeLightbox = () => {
    setClosingLightbox(true)
    setTimeout(() => {
      setOpenLightbox(false)
      setClosingLightbox(false)
    }, 500)
  }

  const handleClickOutside = event => {
    if (event.type === "keydown") {
      switch (event.key) {
        case "ArrowLeft":
          moveImgIndex("left")
          break

        case "ArrowRight":
          moveImgIndex("right")
          break

        case "Escape":
          closeLightbox()
          break

        default:
          break
      }

      return
    }

    if (event.type === "click") {
      if (leftRef && leftRef?.current?.contains(event.target)) {
        return
      }
      if (rightRef && rightRef?.current?.contains(event.target)) {
        return
      }
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        closeLightbox()
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    document.addEventListener("keydown", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
      document.removeEventListener("keydown", handleClickOutside, true)
    }
  }, [])

  const [closingLightbox, setClosingLightbox] = useState(false)

  return openLightbox ? (
    <div
      className={`lightbox__container ${
        openLightbox && "lightbox__container--active"
      } ${closingLightbox && "lightbox__container--closed"}`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <span
        style={{ color: "white", opacity: imgIndex > 0 ? 1 : 0 }}
        onClick={() => (imgIndex > 0 ? moveImgIndex("left") : closeLightbox())}
        ref={leftRef}
      >
        Left
      </span>

      {imgIndex > 0 && images[imgIndex - 2] && (
        <img src={images[imgIndex - 2].src} style={{ display: "none" }} />
      )}
      {imgIndex > 0 && images[imgIndex - 1] && (
        <img src={images[imgIndex - 1].src} style={{ display: "none" }} />
      )}
      <img src={images[imgIndex].src} ref={imgRef} />
      {images[imgIndex + 1] && (
        <img src={images[imgIndex + 1].src} style={{ display: "none" }} />
      )}
      {images[imgIndex + 2] && (
        <img src={images[imgIndex + 2].src} style={{ display: "none" }} />
      )}

      <span
        style={{
          color: "white",
          opacity: imgIndex !== images.length - 1 ? 1 : 0,
        }}
        onClick={() =>
          imgIndex !== images.length - 1
            ? moveImgIndex("right")
            : closeLightbox()
        }
        ref={rightRef}
      >
        Right
      </span>
    </div>
  ) : (
    <></>
  )
}

export default LightboxContainer
