import * as React from "react"

const Blockquote = props => {
  if (props.quote) {
    if (!props.author) {
      return (
        <>
          <div className="blockquote">
            <blockquote>{props.quote}</blockquote>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="blockquote">
            <blockquote>{props.quote}</blockquote>
            <br />
            <span> - {props.author}</span>
          </div>
        </>
      )
    }
  } else {
    return <></>
  }
}

export default Blockquote
