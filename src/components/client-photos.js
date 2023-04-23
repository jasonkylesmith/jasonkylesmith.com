import React, { useRef, useState } from "react"
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

  const imgIndexRef = useRef(0)

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

  const colLGClass = photos.length > 3 ? "col-lg-4" : "col-lg-4"

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
            const { width, height } =
              photo?.photo?.file?.details?.image ?? photo.file.details.image
            const { url: src } = photo?.photo?.file ?? photo.file
            const { description: alt } = photo?.photo ?? photo

            const isVertical = width < height ? true : false

            let count

            if (!photo.photoName) {
              const indexOfLastHyphen = photo.title.lastIndexOf("-")
              count = photo.title.substring(indexOfLastHyphen + 1)
            } else {
              count = null
            }

            return (
              <div
                className={`col-12 col-sm-6 col-md-4  ${colLGClass} mb-2`}
                key={`${
                  photo?.photo?.contentful_id ?? photo.contentful_id
                }-${index}`}
              >
                <div className="item">
                  <div className="inner-item">
                    <img
                      loading
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
                    <span style={{ fontSize: ".9rem" }}>
                      {photo.photoName ?? `Photo ${count}`}
                    </span>
                  </div>
                  {photo.photographerRating && (
                    <div className="col d-flex justify-content-end align-items-center">
                      <Tooltip direction="center" tipText="Photographer Rating">
                        <Ratings rating={photo.photographerRating} />
                      </Tooltip>
                    </div>
                  )}
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
