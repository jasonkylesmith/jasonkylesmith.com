import * as React from "react"

const DoubleColumnHighlight = props => {
  return (
    <>
      <div className="double-highlight">
        {/* Image div */}
        <div className="highlight-image-wrapper double-column-left">
          <img src="https://picsum.photos/300" />
        </div>

        {/* Description div */}
        <div className="highlight-desc-wrapper double-column-right">
          <h3 className="asset-title">Title</h3>
          <p className="subtitle">Subtitle</p>
          <p>Description of the thing here.</p>
        </div>
      </div>
    </>
  )
}

export default DoubleColumnHighlight
