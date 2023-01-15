import React, { useEffect, useRef, useState } from "react"
import LightboxContainer from "./lightbox-display"

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

  return (
    <>
      <LightboxContainer
        images={photos}
        openLightbox={openLightbox}
        setOpenLightbox={setOpenLightbox}
        moveImgIndex={moveImgIndex}
        imgIndex={imgIndex}
      />

      <div className="client-gallery">
        <div className="client-gallery--container row">
          {photos.map((photo, index) => {
            const { width, height } = photo.photo.file.details.image
            const { url: src } = photo.photo.file
            const { description: alt } = photo.photo

            const isVertical = width < height ? true : false

            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-2"
                key={photo.contentful_id}
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
                </div>
                <span>{photo.photoName}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ClientPhotos
