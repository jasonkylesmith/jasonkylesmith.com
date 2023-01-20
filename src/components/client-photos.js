import React, { useEffect, useRef, useState } from "react"
import LightboxContainer from "./lightbox-display"
import Ratings from "./ratings"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import Tooltip from "./tooltip"

library.add(fas)

const ClientPhotos = ({ photos }) => {
  const [openLightbox, setOpenLightbox] = useState(false)
  const [imgIndex, setImgIndex] = useState()
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const imgIndexRef = useRef(0)

  useEffect(() => {
    const getInnerWidth = () => {
      setInnerWidth(window.innerWidth)
    }

    window.addEventListener("resize", () => getInnerWidth(), true)

    return () =>
      window.removeEventListener("resize", () => getInnerWidth(), true)
  }, [])

  const moveImgIndex = direction => {
    if (direction === "left" && imgIndexRef.current > 0) {
      // setImgIndex(imgIndexRef - 1)
      imgIndexRef.current = imgIndexRef.current - 1
      setImgIndex(imgIndexRef.current)
    }

    if (direction === "right" && imgIndexRef.current < photos?.length - 1) {
      // setImgIndex(imgIndexRef + 1)
      imgIndexRef.current = imgIndexRef.current + 1
      setImgIndex(imgIndexRef.current)
    }
  }

  photos = [...photos, ...photos, ...photos, ...photos]

  const colLGClass = photos.length > 3 ? "col-lg-3" : "col-lg-4"

  return (
    <>
      <LightboxContainer
        images={photos}
        openLightbox={openLightbox}
        setOpenLightbox={setOpenLightbox}
        moveImgIndex={moveImgIndex}
        imgIndex={imgIndex}
        isClient
      />

      <div className="client-gallery">
        <div className="client-gallery--container row">
          {photos.map((photo, index) => {
            const { width, height } = photo.photo.file.details.image
            const { url: src } = photo.photo.file
            const { description: alt, contentful_id } = photo.photo

            const isVertical = width < height ? true : false

            return (
              <div
                className={`col-12 col-sm-6 col-md-4  ${colLGClass} mb-2`}
                key={`${photo.photo.contentful_id}-${index}`}
              >
                <div className="item">
                  <div className="inner-item">
                    <img
                      src={src}
                      alt={alt}
                      className={isVertical ? "vertical" : "horizontal"}
                      onClick={() => {
                        imgIndexRef.current = index
                        setImgIndex(index)
                        setOpenLightbox(true)
                      }}
                    />
                  </div>
                  {photo.clientFavorite && (
                    <span
                      style={{ position: "absolute", right: ".3rem", top: 0 }}
                    >
                      <Tooltip direction="right" tipText="Client Favorite">
                        <FontAwesomeIcon
                          icon={["fas", "heart"]}
                          style={{
                            color: "#663cf0",
                            height: ".7rem",
                            width: ".7rem",
                          }}
                        />
                      </Tooltip>
                    </span>
                  )}
                </div>
                <div className="row">
                  <div className="col">
                    <span style={{ fontSize: ".9rem" }}>{photo.photoName}</span>
                  </div>
                  <div className="col d-flex justify-content-end align-items-center">
                    <Tooltip direction="center" tipText="Photographer Rating">
                      <Ratings rating={photo.photographerRating} />
                    </Tooltip>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ClientPhotos
