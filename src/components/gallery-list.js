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

    const linkTo =
      id === "gallery"
        ? `/${category.toLowerCase().replace(/\s+/g, "")}/${slug}`
        : `/blog/${slug}`

    return (
      <div
        className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0"
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
