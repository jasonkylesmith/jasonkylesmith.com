import React, { useCallback, useEffect, useRef, useState } from "react"
import Ratings from "./ratings"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import { GatsbyImage } from "gatsby-plugin-image"

library.add(fas)

// max-height and max-width for images?

const LightboxContainer = props => {
  const {
    openLightbox,
    setOpenLightbox,
    photos,
    images,
    moveImgIndex,
    imgIndex,
    isClient,
  } = props

  const imgRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const allImages = images || photos

  const closeLightbox = useCallback(() => {
    setClosingLightbox(true)
    setTimeout(() => {
      setOpenLightbox(false)
      setClosingLightbox(false)
    }, 500)
  }, [setOpenLightbox])

  const handleTransition = direction => {
    setTransitionStatus("lightbox__transition--closing")
    setTimeout(() => {
      moveImgIndex(direction)
      setTransitionStatus("lightbox__transition--opening")
      setTimeout(() => {
        setTransitionStatus("lightbox__transition--active")
      }, 250)
    }, 250)
  }

  useEffect(() => {
    const checkSwipe = () => {
      const diff = touchStartX - touchEndX
      const limit = 35

      if (diff > limit) {
        handleTransition("right")
      }
      if (diff < -limit) {
        handleTransition("left")
      }
    }

    const handleClickOutside = event => {
      if (event.type === "keydown") {
        switch (event.key) {
          case "ArrowLeft":
            handleTransition("left")
            break

          case "ArrowRight":
            handleTransition("right")
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
        console.log("leftRef", leftRef)
        console.log("rightRef", rightRef)
        console.log("imgRef", imgRef)

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

    let touchStartX = 0
    let touchEndX = 0

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

      document.removeEventListener(
        "touchstart",
        e => {
          touchStartX = e.changedTouches[0].screenX
        },
        true
      )
      document.removeEventListener(
        "touchend",
        e => {
          touchEndX = e.changedTouches[0].screenX
          checkSwipe()
        },
        true
      )
    }
  }, [closeLightbox])

  const [closingLightbox, setClosingLightbox] = useState(false)
  const [transitionStatus, setTransitionStatus] = useState(
    "lightbox__transition--active"
  )

  return openLightbox ? (
    <div
      className={`lightbox__container ${
        openLightbox && "lightbox__container--active"
      } ${closingLightbox && "lightbox__container--closed"}`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <span
        style={{
          color: "#f7f7f7",
          cursor: "pointer",
          opacity: imgIndex > 0 ? 1 : 0,
          padding: "1rem",
          fontSize: "2rem",
        }}
        onClick={() => {
          imgIndex > 0 ? handleTransition("left") : closeLightbox()
        }}
        onKeyPress={e => {
          if (e.code === "Space" || e.code === "Enter") handleTransition("left")
        }}
        role="button"
        tabIndex={0}
        ref={leftRef}
      >
        {"<"}
      </span>

      {imgIndex > 0 && allImages[imgIndex - 2] && (
        <GatsbyImage
          image={allImages[imgIndex - 2].gatsbyImageData}
          style={{ display: "none" }}
          alt={
            allImages[imgIndex - 2].alt ||
            allImages[imgIndex - 2]?.photo?.description ||
            allImages[imgIndex - 2].description ||
            ""
          }
        />
      )}
      {imgIndex > 0 && allImages[imgIndex - 1] && (
        <GatsbyImage
          image={allImages[imgIndex - 1].gatsbyImageData}
          style={{ display: "none" }}
          alt={
            allImages[imgIndex - 1].alt ||
            allImages[imgIndex - 1]?.photo?.description ||
            allImages[imgIndex - 1].description ||
            ""
          }
        />
      )}
      <div
        style={{}}
        className={`d-flex flex-column position-relative lightbox__transition ${transitionStatus}`}
      >
        <div ref={imgRef}>
          <GatsbyImage
            image={
              allImages[imgIndex].gatsbyImageData ||
              allImages[imgIndex]?.photo?.gatsbyImageData
            }
            alt={
              allImages[imgIndex].alt ||
              allImages[imgIndex]?.photo?.description ||
              allImages[imgIndex].description ||
              ""
            }
          />
        </div>

        {isClient && allImages[imgIndex]?.clientFavorite && (
          <span
            style={{ position: "absolute", right: ".3rem", top: 0, zIndex: 11 }}
          >
            <FontAwesomeIcon
              icon={["fas", "heart"]}
              style={{
                color: "#663cf0",
                height: ".9rem",
                width: ".9rem",
              }}
            />
          </span>
        )}
        {isClient && (
          <div
            className={`d-flex flex-row w-100 justify-content-between text-offwhite`}
          >
            <span>{allImages[imgIndex]?.photoName}</span>
            <div>
              <Ratings
                rating={allImages[imgIndex]?.photographerRating}
                isLarger
              />
            </div>
          </div>
        )}
      </div>
      {allImages[imgIndex + 1] && (
        <GatsbyImage
          image={allImages[imgIndex + 1].gatsbyImageData}
          style={{ display: "none" }}
          alt={
            allImages[imgIndex + 1].alt ||
            allImages[imgIndex + 1]?.photo?.description ||
            allImages[imgIndex + 1].description ||
            ""
          }
        />
      )}
      {allImages[imgIndex + 2] && (
        <GatsbyImage
          image={allImages[imgIndex + 2].gatsbyImageData}
          style={{ display: "none" }}
          alt={
            allImages[imgIndex + 2].alt ||
            allImages[imgIndex + 2]?.photo?.description ||
            allImages[imgIndex + 2].description ||
            ""
          }
        />
      )}

      <span
        style={{
          cursor: "pointer",
          color: "#f7f7f7",
          opacity: imgIndex !== allImages.length - 1 ? 1 : 0,
          padding: "1rem",
          fontSize: "2rem",
        }}
        onClick={() =>
          imgIndex !== allImages.length - 1
            ? handleTransition("right")
            : closeLightbox()
        }
        onKeyPress={e => {
          if (e.code === "Space" || e.code === "Enter")
            handleTransition("right")
        }}
        role="button"
        tabIndex={0}
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
