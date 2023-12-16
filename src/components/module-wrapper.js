import React from "react"
import Accordion from "./accordion"
import BlockGallery from "./block-gallery"
import CardList from "./card-list"
import Carousel from "./carousel"
import ClientGallery from "./client-gallery"
import GalleryList from "./gallery-list"
import Hero from "./hero"
import IconList from "./icon-list"
import SplitContent from "./split-content"
import { GatsbyImage } from "gatsby-plugin-image"
import AvailabilityList from "./availability-list"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

const ModuleWrapper = ({ props }) => {
  const {
    overlapNav,
    sectionMargin,
    marginVariant,
    module,
    fullWidth,
    headline,
    backgroundColor,
    backgroundImage,
  } = props

  if (!module) {
    // console.log("Null Module", props)
  }

  if (!module?.sys) {
    /* console.log(module)
    console.log(props) */
  }

  const { id } = module.sys.contentType.sys

  /* console.log("Module Wrapper ID", id) */

  let isHero = module?.isHero ?? false

  const Container = ({ children }) => {
    let content

    if (headline && headline !== "") {
      content = (
        <>
          <h2 className="block__heading">{headline}</h2>
          {children}
        </>
      )
    } else {
      content = children
    }

    if (id === "carousel" && module?.slides < 1) {
      return <></>
    }

    if (!backgroundImage) {
      return (
        <section
          className={`section__${sectionMargin} ${
            marginVariant && `section__${marginVariant}`
          } section__${backgroundColor} ${
            fullWidth ? `row px-0` : `row px-3 px-md-0`
          } ${overlapNav === "yes" && "overlap-nav"}`}
        >
          <div
            className={`${
              fullWidth
                ? `col-12 ${isHero && "d-flex"} px-0 ${id === "hero" && ""}`
                : `col-12 ${isHero && "d-flex"} col-md-10 offset-md-1 px-0`
            }`}
            style={{ paddingTop: overlapNav === "yes" ? "6rem" : "unset" }}
          >
            {content}
          </div>
        </section>
      )
    } else {
      return (
        <section
          className={`section__${sectionMargin} ${
            marginVariant && `section__${marginVariant}`
          } section__${backgroundColor} ${
            fullWidth ? `row px-0` : `row px-3 px-md-0`
          } ${overlapNav === "yes" && "overlap-nav"} ${
            !isHero && "non-hero-bg-image-container"
          } module-bg-image-container`}
          style={{}}
        >
          <div
            className={`module-bg-image-wrapper ${
              !fullWidth ? "col-12 col-md-10 offset-md-1 px-0" : "col-12 px-0"
            }`}
          >
            <img
              src={backgroundImage.file.url}
              alt={backgroundImage.description}
            />
          </div>
          <div
            className={`${
              fullWidth
                ? `col-12 ${isHero && "d-flex"} d-flex px-0 ${
                    id === "hero" && ""
                  }`
                : `col-12 ${
                    isHero && "d-flex"
                  } d-flex col-md-10 offset-md-1 px-0`
            }`}
            style={{ zIndex: 2 }}
          >
            {content}
          </div>
        </section>
      )
    }
  }

  let moduleSection

  switch (id) {
    case "clientGallery":
      moduleSection = <ClientGallery module={module} />
      break
    case "blockGallery":
      moduleSection = (
        <div className="ms-lg-4">
          <BlockGallery block={module} />
        </div>
      )
      break
    case "hero":
      moduleSection = <Hero module={module} />
      break
    case "cardList":
      moduleSection = <CardList module={module} />
      break
    case "carousel":
      moduleSection =
        module.slides?.length > 0 ? <Carousel module={module} /> : <></>
      break
    case "splitContent":
      moduleSection = (
        <SplitContent
          module={module}
          parentFullWidth={fullWidth}
          hasBackgroundImage={backgroundImage ? true : false}
        />
      )
      break
    case "contentPageList":
      moduleSection = <GalleryList module={module} />
      break
    case "iconList":
      moduleSection = <IconList module={module} />
      break
    case "accordion":
      moduleSection = <Accordion module={module} />
      break
    case "placeholder1":
      moduleSection = <AvailabilityList module={module} />
      break
    case "video":
      moduleSection = (
        <div style={{ width: "100%" }}>
          <LiteYouTubeEmbed
            id={module?.youtubeId}
            title="Photobook Teaser"
            poster="maxresdefault"
          />
        </div>
      )
      break
    default:
      moduleSection = <div>{module.name}</div>
  }

  return <Container>{moduleSection}</Container>
}

export default ModuleWrapper
