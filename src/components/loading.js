import React from "react"

const Loading = () => {
  return (
    <div class="d-flex justify-content-center" style={{ marginTop: "6rem" }}>
      <div
        class="spinner-border"
        style={{ height: "3rem", width: "3rem" }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
