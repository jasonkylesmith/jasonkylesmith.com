import React from "react"

const Tooltip = props => {
  const { text, tipText } = props

  return (
    <div className="tooltip--container">
      <span>{text}</span>
      <span className="tooltip--text">{tipText}</span>
    </div>
  )
}

export default Tooltip
