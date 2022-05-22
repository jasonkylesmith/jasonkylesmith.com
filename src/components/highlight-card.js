import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const HighlightCard = props => {
  const { title, body, highlight } = props.node
  const { gatsbyImageData } = highlight.featuredImage

  console.log(gatsbyImageData)

  return (
    <div className="card" style={{ width: "400px" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <h4>{title}</h4>
          </div>
          <div className="col-6">
            <div style={{}}>
              <GatsbyImage
                className=""
                imgStyle={{ borderRadius: ".25rem" }}
                image={gatsbyImageData}
                alt={title}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              dangerouslySetInnerHTML={{
                __html: body.childrenMarkdownRemark[0].html,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlightCard
