import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

library.add(fas)

const Ratings = ({ rating, isLarger }) => {
  const Star = () => {
    return (
      <FontAwesomeIcon
        icon={["fas", "star"]}
        style={{
          color: "#663cf0",
          height: isLarger ? ".9rem" : ".7rem",
          width: isLarger ? ".9rem" : ".7rem",
        }}
      />
    )
  }

  return (
    <>
      {rating >= 0 && rating <= 5 ? (
        [...Array(rating)].map((e, i) => <Star />)
      ) : (
        <></>
      )}
    </>
  )
}

export default Ratings
