import React, { useEffect, useRef, useState } from "react"

// max-height and max-width for images?

const useLightboxDisplay = (
  openLightbox,
  setOpenLightbox,
  setClosingLightbox
) => {
  const [isLightboxVisible, setIsLightboxVisible] = useState(openLightbox)
  const ref = useRef(null)

  const handleClickOutside = event => {
    if (event.type === "click" || event.key === "Escape") {
      if (ref.current && !ref.current.contains(event.target)) {
        setClosingLightbox(true)
        setTimeout(() => {
          setOpenLightbox(false)
          setClosingLightbox(false)
          setIsLightboxVisible(false)
        }, 500)
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

  return { ref, isLightboxVisible, setIsLightboxVisible }
}

const LightboxContainer = props => {
  const { image, openLightbox, setOpenLightbox } = props

  console.log("Props", props)

  const [closingLightbox, setClosingLightbox] = useState(false)

  const { ref, isLightboxVisible, setIsLightboxVisible } = useLightboxDisplay(
    openLightbox,
    setOpenLightbox,
    setClosingLightbox
  )

  useEffect(() => {
    setIsLightboxVisible(openLightbox)
  }, [openLightbox])

  return isLightboxVisible ? (
    <div
      className={`lightbox__container ${
        openLightbox && "lightbox__container--active"
      } ${closingLightbox && "lightbox__container--closed"}`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <img src={image} ref={ref} />
    </div>
  ) : (
    <></>
  )
}

export default LightboxContainer
