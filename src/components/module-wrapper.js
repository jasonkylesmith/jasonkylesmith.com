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

  const { id } = module.sys.contentType.sys

  /* console.log("Module Wrapper ID", id) */

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
          }`}
          style={overlapNav && { marginTop: "-6rem" }}
        >
          <div
            className={
              fullWidth
                ? `col-12 px-0 ${id === "hero" && ""}`
                : `col-12 col-md-10 offset-md-1 px-0`
            }
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
          } ${overlapNav && "overlap-nav"} module-bg-image-container`}
          style={{
            aspectRatio: `${backgroundImage.gatsbyImageData.width}/${backgroundImage.gatsbyImageData.height}`,
          }}
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
                ? `col-12 px-0 ${id === "hero" && ""}`
                : `col-12 col-md-10 offset-md-1 px-0`
            }`}
            style={{ zIndex: 2, height: "100%" }}
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
      moduleSection = <BlockGallery block={module} />
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
    default:
      moduleSection = <div>{module.name}</div>
  }

  return <Container>{moduleSection}</Container>
}

export default ModuleWrapper
