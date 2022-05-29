import React from "react"

const MarkdownDisplay = props => {
  const { html } = props

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}

export default MarkdownDisplay
