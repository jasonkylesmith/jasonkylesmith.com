import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

library.add(fas)

const HighlightCard = props => {
  const { title, body, highlight } = props.node
  const { gatsbyImageData } = highlight.featuredImage
  const { slug } = highlight

  const category = highlight.category
    ? highlight.category.toLowerCase().replace(/\s+/g, "")
    : "blog"

  return (
    <div className="card highlight">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <Link to={`/${category}/${slug}`} className="gallery-link">
              <div>
                <GatsbyImage
                  className=""
                  imgStyle={{ borderRadius: ".25rem" }}
                  image={gatsbyImageData}
                  alt={highlight.title}
                />
                <div className="highlight__caption">
                  <span className="small">{highlight.title}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12">
            <h4 className="m-0">{title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12 highlight__body">
            <div
              dangerouslySetInnerHTML={{
                __html: body.childrenMarkdownRemark[0].html,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 highlight__body highlight__body--right">
            <Link to={`/${category}`} className="">
              {title}
            </Link>
            <div style={{ marginBottom: "-2px" }}>
              <FontAwesomeIcon icon={["fas", "angle-right"]} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlightCard
