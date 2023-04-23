import React from "react"
import Link from "./link-button"

import TempImage from "../images/test-background.jpg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Hero = ({ module }) => {
  const { backgroundImage, copy, ctaButton, headline, featuredImages } = module

  const getAspectRatio = (width, height) => {
    if (width >= height) {
      return "horizontal"
    }

    if (height > width) {
      return "vertical"
    }
  }

  /* return (
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
  ) */

  return (
    <div
      className="col-12 d-flex flex-column flex-lg-row justify-content-center align-items-center p-4 p-md-0  new-hero-container"
      style={{
        height: "80vh",
      }}
    >
      <div className="col-12 col-md-8 offset-0 col-lg-4 offset-lg-0 p-3 p-lg-4">
        <h2 className="block__heading on-black pe-4 mb-0 hero-headline">
          {headline}
        </h2>
        <div className="pe-2 mb-4">{copy.copy}</div>
        <Link data={ctaButton} className="btn mb-0" />
      </div>
      <div className="col-12 d-none d-lg-grid col-lg-4 p-0 p-lg-4 hero-image-container">
        {featuredImages &&
          featuredImages.length > 0 &&
          featuredImages.map(image => {
            const { width, height } = image.file.details.image

            console.log(image.file.url)

            return (
              <div className={"hero-image-wrapper"}>
                <img
                  src={image.file.url}
                  alt={image.description}
                  className={getAspectRatio(width, height)}
                />
              </div>
            )
          })}
      </div>

      <div className="col-12 col-md-8 d-flex d-lg-none  p-0  hero-image-container-small">
        {featuredImages &&
          featuredImages.length > 0 &&
          featuredImages.map(image => {
            const { width, height } = image.file.details.image

            return (
              <div className={"hero-image-wrapper"}>
                <img
                  src={image.file.url}
                  alt={image.description}
                  className={getAspectRatio(width, height)}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Hero
