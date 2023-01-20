import React from "react"
import BlockGallery from "./block-gallery"
import CardList from "./card-list"
import Carousel from "./carousel"
import ClientGallery from "./client-gallery"
import Hero from "./hero"
import SplitContent from "./split-content"

const ModuleWrapper = ({ props }) => {
  const { sectionMargin, module, fullWidth, headline, backgroundColor } = props
  const { id } = module.sys.contentType.sys

  console.log(id, backgroundColor)

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

    if (!fullWidth) {
      return (
        <section
          className={`section__${sectionMargin} section__${backgroundColor} row px-2`}
        >
          <div className="col-12 col-md-8 offset-md-2">{content}</div>
        </section>
      )
    } else {
      return (
        <section
          className={`section__${sectionMargin} section__${backgroundColor} row px-0`}
        >
          <div className={`col-12 ${id === "hero" && "px-0"}`}>{content}</div>
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
      moduleSection = <Carousel module={module} />

      break
    case "splitContent":
      moduleSection = (
        <SplitContent module={module} parentFullWidth={fullWidth} />
      )
      break
    default:
      moduleSection = <div>{module.name}</div>
  }

  return <Container>{moduleSection}</Container>
}

export default ModuleWrapper
