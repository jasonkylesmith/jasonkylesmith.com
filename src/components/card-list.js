import React from "react"
import HighlightCard from "./highlight-card"
import MarkdownDisplay from "./markdown-display"

const CardList = ({ module }) => {
  const { cards, variant } = module

  const PricingCard = ({ card }) => {
    console.log("Card", card)

    const {
      body,
      category,
      discountText,
      discountedPrice,
      price,
      includes,
      title,
      highlightText,
    } = card

    console.log(body)

    return (
      <div className={`pricingCard ${highlightText && "highlight"}`}>
        {highlightText && (
          <h6 className="pricingCard--highlight">{highlightText}</h6>
        )}
        {title && <h2 className="pricingCard--title">{title}</h2>}
        {price && (
          <h2 className="pricingCard--pricing">
            <span
              className={
                !discountedPrice
                  ? "pricingCard--price"
                  : "pricingCard--price pricingCard--strike"
              }
            >
              ${price} {!discountedPrice && <sup>+tax</sup>}
            </span>
            {discountedPrice && (
              <span className="pricingCard--discounted">
                {" "}
                ${discountedPrice} <sup>+tax</sup>
              </span>
            )}
          </h2>
        )}
        {body && <MarkdownDisplay props={body.childMarkdownRemark} />}
        {includes && (
          <ul>
            {includes.map(text => (
              <li>{text}</li>
            ))}
          </ul>
        )}
        <div className="block">BOOK</div>
      </div>
    )
  }

  return variant === "hightlight list" ? (
    <div className="highlight__container">
      {cards
        .sort((a, b) => a.order - b.order)
        .map((card, index) => {
          return card.sys.contentType.sys.id === "highlightCard" ? (
            <HighlightCard {...card} key={card.id} />
          ) : null
        })}
    </div>
  ) : (
    variant === "pricing list" && (
      <div className="pricingList__container">
        {cards.map((card, index) => {
          return card.sys.contentType.sys.id === "pricingCard" ? (
            <PricingCard key={card.id} card={card} />
          ) : null
        })}
      </div>
    )
  )
}

export default CardList
