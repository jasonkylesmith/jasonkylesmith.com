import React from "react"
import Link from "./link-button"

const Hero = ({ module }) => {
  const { backgroundImage, copy, ctaButton, headline } = module

  return (
    <div
      className="col-12 d-flex justify-content-center align-items-center p-4 p-md-0"
      style={{
        height: "80vh",
        backgroundImage: `url(${backgroundImage.file.url})`,
        backgroundSize: "cover",
      }}
    >
      <div className="hero-text d-flex flex-row hero-container">
        <div className="p-4 text-white col-12">
          <h1 className="block__heading on-black pe-4 mb-0">{headline}</h1>
          <div className="pe-2 mb-4">{copy.copy}</div>
          <Link data={ctaButton} className="btn mb-0" />
        </div>
      </div>
    </div>
  )
}

export default Hero
