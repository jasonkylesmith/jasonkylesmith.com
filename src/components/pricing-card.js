import React from "react"

const PricingCard = props => {
  const {
    title,
    body,
    includes,
    price,
    discountedPrice,
    discountText,
    category,
  } = props

  console.log(discountedPrice)
  return (
    <div className="col-12 col-lg-6">
      <div className="card pricing h-100 shadow-sm">
        <div className="card-header pricing__header">
          <h4 className="block__heading">{title}</h4>
        </div>
        <div className="card-body pricing__body">
          <div
            dangerouslySetInnerHTML={{
              __html: body.childrenMarkdownRemark[0].html,
            }}
          />
        </div>
        <div className="card-footer pricing__footer">
          <ul>
            {includes.map((text, index) => {
              return <li key={text}>{text}</li>
            })}
          </ul>
          <div className="d-flex position-relative justify-content-end">
            <span
              className={`pricing__price ${
                discountedPrice > 0 && "pricing__price--cross-out"
              }`}
            >
              {!discountedPrice > 0 && "Starting at "}${price}
            </span>
            {discountedPrice > 0 && (
              <span className="pricing__price">
                Starting at ${discountedPrice}
              </span>
            )}
          </div>
          <div className="d-flex position-relative justify-content-end">
            <span className="small pricing__discount-text">{discountText}</span>
          </div>
          <div className="d-flex justify-content-end">
            <a href={`/contact?destination=${category}`} className="btn mb-0">
              Let's Get in Touch!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCard
