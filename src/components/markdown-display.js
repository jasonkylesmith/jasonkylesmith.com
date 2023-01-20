import React from "react"

const MarkdownDisplay = props => {
  const { html } = props.props || props

  return (
    <div
      className="markdown-display"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}

export default MarkdownDisplay
