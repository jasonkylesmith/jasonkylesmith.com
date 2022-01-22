import * as React from "react"
import SocialIcons from "./social-icons"

const Author = props => {
  return (
    <>
      <div className="author-container">
        <div className="author-image-wrapper">
          <img src="http://picsum.photos/200/" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="author-name">
            <h6>Jason Smith</h6>
          </div>
          <div className="author-description">
            <p className="small">
              Web developer, photographer, designer, father / husband, video
              game enthusiast, B-level wallyball player, and all around average
              guy.
            </p>
            <div>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Author
