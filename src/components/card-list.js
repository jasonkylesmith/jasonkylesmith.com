import React from "react"
import HighlightCard from "./highlight-card"

const CardList = ({ module }) => {
  const { cards } = module

  return (
    <div className="highlight__container">
      {cards
        .sort((a, b) => a.order - b.order)
        .map((card, index) => {
          console.log(card)
          return <HighlightCard {...card} key={card.id} />
        })}
    </div>
  )
}

export default CardList
