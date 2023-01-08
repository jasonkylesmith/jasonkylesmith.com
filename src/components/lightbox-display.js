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

  const checkSwipe = () => {
    if (touchEndX < touchStartX) {
      console.log("swiped left")
      moveImgIndex("right")
    }
    if (touchEndX > touchStartX) {
      console.log("swiped right")
      moveImgIndex("left")
    }
  }

  let touchStartX = 0
  let touchEndX = 0

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    document.addEventListener("keydown", handleClickOutside, true)
    document.addEventListener(
      "touchstart",
      e => {
        touchStartX = e.changedTouches[0].screenX
      },
      true
    )
    document.addEventListener(
      "touchend",
      e => {
        touchEndX = e.changedTouches[0].screenX
        checkSwipe()
      },
      true
    )

    return () => {
      document.removeEventListener("click", handleClickOutside, true)
      document.removeEventListener("keydown", handleClickOutside, true)
    }
  }, [])

  const [closingLightbox, setClosingLightbox] = useState(false)
  const [imageChanging, setImageChanging] = useState(false)

  return openLightbox ? (
    <div
      className={`lightbox__container ${
        openLightbox && "lightbox__container--active"
      } ${closingLightbox && "lightbox__container--closed"}`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <span
        style={{
          color: "white",
          cursor: "pointer",
          opacity: imgIndex > 0 ? 1 : 0,
          padding: "1rem",
          fontSize: "2rem",
        }}
        onClick={() => {
          imgIndex > 0 ? moveImgIndex("left") : closeLightbox()
        }}
        ref={leftRef}
      >
        {"<"}
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
          cursor: "pointer",
          color: "white",
          opacity: imgIndex !== images.length - 1 ? 1 : 0,
          padding: "1rem",
          fontSize: "2rem",
        }}
        onClick={() =>
          imgIndex !== images.length - 1
            ? moveImgIndex("right")
            : closeLightbox()
        }
        ref={rightRef}
      >
        {">"}
      </span>
    </div>
  ) : (
    <></>
  )
}

export default LightboxContainer
