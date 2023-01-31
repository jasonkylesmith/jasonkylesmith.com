import React from "react"

const MarkdownDisplay = props => {
  const { html } = props.props || props

  const { noButton } = props

  return (
    <div
      className={`markdown-display${
        noButton ? " noButtonStyle" : " buttonStyle"
      }`}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}

export default MarkdownDisplay
