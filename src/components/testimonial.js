import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const Testimonial = props => {
  const variant = props.variant ? props.variant : "left"
  const { client, subtitle, quote, body, image } = props

  return (
    <div className="ms-2 ms-md-0 testimonial testimonial--left justify-content-center  flex-column flex-lg-row">
      {image && (
        <div className="testimonial__image  mb-4 mb-lg-0">
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={image.description}
            imgStyle={{ borderRadius: ".25rem" }}
            objectPosition="center center"
          />
        </div>
      )}

      <div className="testimonial__content">
        {body && (
          <div className="testimonial__body-container">
            <p>{body}</p>
            {client && <h5>{client}</h5>}
          </div>
        )}
        {/* <div className="testimonial__client-container">
      {client && <h5>{client}</h5>}
      {subtitle && <span className="small">{subtitle}</span>}
    </div> */}
      </div>
    </div>
  )

  /* if (variant === "left") {
    return (
      <div className="ms-2 ms-md-0 testimonial testimonial--left justify-content-between">
        {image && (
          <div className="testimonial__image">
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
              imgStyle={{ borderRadius: ".25rem" }}
              objectPosition="center center"
            />
          </div>
        )}

        <div className="testimonial__content">
          {body && (
            <div className="testimonial__body-container">
              <p>{body}</p>
              {client && <h5>{client}</h5>}
            </div>
          )}
          
        </div>
      </div>
    )
  } else if (variant === "right") {
    return (
      <div className="ms-2 ms-md-0 testimonial testimonial--right justify-content-between">
        <div className="testimonial__content">
          {body && (
            <div className="testimonial__body-container">
              <p>{body}</p>
              {client && <h5>{client}</h5>}
            </div>
          )}
          
        </div>
        {image && (
          <div className="testimonial__image">
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
              imgStyle={{ borderRadius: ".25rem" }}
              objectPosition="center center"
            />
          </div>
        )}
      </div>
    )
  } */
}

export default Testimonial
