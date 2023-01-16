import React from "react"

const Tooltip = props => {
  const { children, tipText, direction } = props

  console.log("Tool Tip Props", props)

  return (
    <div className="tooltip--container">
      {children}
      <span className={`tooltip--text ${direction ? direction : "bottom"}`}>
        {tipText}
      </span>
    </div>
  )
}

export default Tooltip
