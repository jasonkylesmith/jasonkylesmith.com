import * as React from "react"
import SocialIcons from "./social-icons"

const Author = props => {
  return (
    <>
      <div className="author-container">
        <div className="author-image-wrapper">
          <img src="http://picsum.photos/200/" />
        </div>
        <div className="author-description">
          <p>
            
          </p>
          <SocialIcons />
        </div>
      </div>
    </>
  )
}

export default Author
