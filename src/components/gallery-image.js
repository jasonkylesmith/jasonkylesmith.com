import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"

const GalleryImage = props => {
  const { gatsbyImageData, file } = props.image
  console.log("Gallery Image", props)

  const [checked, setChecked] = useState(false)

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          borderWidth: 2,
          borderColor: "pink",
          height: 100,
          width: 100,
          left: 10,
          top: 10,
          index: 5000,
        }}
      ></div>
      <GatsbyImage
        image={gatsbyImageData}
        alt=""
        imgStyle={{ padding: checked ? 20 : 0 }}
        onClick={() => {
          setChecked(!checked)
        }}
      />
    </div>
  )
}

export default GalleryImage
