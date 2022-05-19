import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const Testimonial = props => {
  const variant = props.variant ? props.variant : "left"
  const { client, subtitle, quote, body, image } = props

  if (variant === "left") {
    return (
      <div
        className="d-flex flex-row"
        style={{ width: "50%", borderLeft: "2px solid black", height: "200px" }}
      >
        {image && (
          <div
            style={{ width: "200px", marginLeft: "1rem", marginRight: "1rem" }}
          >
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
              objectPosition="center center"
            />
          </div>
        )}

        {/* <img
            src={`${image}`}
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
            className="img-fluid"
          /> */}
        <div
          style={{
            flex: 1,
            border: "0px dotted orange",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {quote && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: body && body.length > 0 ? 0 : 1,
              }}
            >
              <h3>"{quote}"</h3>
            </div>
          )}
          {body && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <p>{body}</p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "0px dotted pink",
              alignItems: "flex-end",
            }}
          >
            {client && <h5 style={{ margin: 0 }}>{client}</h5>}
            {subtitle && <span className="small">{subtitle}</span>}
          </div>
        </div>
      </div>
    )
  } else if (variant === "right") {
    return (
      <div
        className="d-flex flex-row"
        style={{
          width: "50%",
          borderRight: "0px solid black",
          height: "200px",
        }}
      >
        <div
          style={{
            flex: 1,
            border: "0px dotted orange",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {quote && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: body && body.length > 0 ? 0 : 1,
              }}
            >
              <h3>"{quote}"</h3>
            </div>
          )}
          {body && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <p>{body}</p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "0px dotted pink",
              alignItems: "flex-end",
            }}
          >
            {client && <h5 style={{ margin: 0 }}>{client}</h5>}
            {subtitle && <span className="small">{subtitle}</span>}
          </div>
        </div>
        {image && (
          <div
            style={{ width: "200px", marginLeft: "1rem", marginRight: "1rem" }}
          >
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
              objectPosition="center center"
            />
          </div>
        )}
      </div>
    )
  }
}

export default Testimonial
