import React from "react"

const Testamonial = props => {
  const variant = props.variant ? props.variant : "left"
  const { author, subtitle, quote, body, image } = props

  console.log(image)

  if (variant === "left") {
    return (
      <div
        className="d-flex flex-row"
        style={{ width: "50%", borderLeft: "2px solid black", height: "200px" }}
      >
        {image && (
          <img
            src={`${image}`}
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
            className="img-fluid"
          />
        )}
        <div
          style={{
            flex: 1,
            border: "2px dotted orange",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {quote && (
            <div>
              <h3>"{quote}"</h3>
            </div>
          )}
          {body && (
            <div style={{ flex: 1 }}>
              <p>{body}</p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px dotted pink",
              alignItems: "flex-end",
            }}
          >
            {author && <h5 style={{ margin: 0 }}>{author}</h5>}
            {subtitle && <span className="small">{subtitle}</span>}
          </div>
        </div>
      </div>
    )
  } else if (variant === "right") {
    return (
      <div
        className="d-flex flex-row"
        style={{
          width: "50%",
          borderRight: "2px solid black",
          height: "200px",
        }}
      >
        <div
          style={{
            flex: 1,
            border: "2px dotted orange",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {quote && (
            <div>
              <h3>"{quote}"</h3>
            </div>
          )}
          {body && (
            <div style={{ flex: 1 }}>
              <p>{body}</p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px dotted pink",
              alignItems: "flex-end",
            }}
          >
            {author && <h5 style={{ margin: 0 }}>{author}</h5>}
            {subtitle && <span className="small">{subtitle}</span>}
          </div>
        </div>
        {image && (
          <img
            src={`${image}`}
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
            className="img-fluid"
          />
        )}
      </div>
    )
  }
}

export default Testamonial
