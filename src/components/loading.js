import React from "react"

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "6rem" }}
    >
      <div
        className="spinner-border"
        style={{ height: "3rem", width: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
