import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const GalleryList = ({ module, category }) => {
  const moduleToUse = module.pages || module

  const Gallery = ({ page }) => {
    const { id } = page.sys.contentType.sys
    const {
      name,
      title: blogTitle,
      category,
      featuredImage,
      slug,
      contentful_id,
    } = page
    const { gatsbyImageData, title } = featuredImage

    let linkTo
    // console.log(id, slug)

    switch (id) {
      case "gallery":
        linkTo = `/${category.toLowerCase().replace(/\s+/g, "")}/${slug}`
        break
      case "blogPost":
        linkTo = `/blog/${slug}`
        break
      default:
        linkTo = `/${slug}`
    }

    let colNum

    if (moduleToUse.length % 3 === 0) {
      colNum = 4
    } else if (moduleToUse.length % 2 === 0) {
      colNum = 6
    } else if (moduleToUse.length % 1 === 0) {
      colNum = 12
    }

    return (
      <div
        className={`col-12 col-sm-12 col-md-6 col-lg-${colNum} col-xl-${colNum} mb-4 mx-0`}
        key={contentful_id}
      >
        <Link to={linkTo} className="gallery-link">
          <div className="">
            <div className="position-relative">
              <GatsbyImage
                className=""
                imgStyle={{ borderRadius: ".25rem" }}
                image={gatsbyImageData}
                alt={title}
              />
            </div>
            <div className="">
              <h4 className="text-dark mt-1 mb-0">{name || blogTitle}</h4>
              <span
                className="text-dark small fw-normal"
                style={{ fontSize: "14px" }}
              ></span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="row">
      {category && (
        <div className="col-12">
          <h1 className="block__heading">{category}</h1>
        </div>
      )}
      <div className="col-12">
        <div className="row">
          {moduleToUse.map((page, index) => {
            return <Gallery page={page.node || page} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default GalleryList
