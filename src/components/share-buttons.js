import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

library.add(fas)

const ShareButtons = props => {
  const iconSize = 22

  const { slug, title, directory, sources } = props

  return (
    <div className="share-container">
      {sources.includes("Facebook") && (
        <FacebookShareButton
          url={`https://preview.jasonkylesmith.com/${directory}/${slug}`}

          /* hashtag="#hashtag" */
        >
          <div
            className="share__react-share-container"
            title="Share on Facebook"
          >
            <FacebookIcon size={iconSize} />
          </div>
        </FacebookShareButton>
      )}
      {sources.includes("Twitter") && (
        <TwitterShareButton
          url={`https://preview.jasonkylesmith.com/${directory}/${slug}`}
          title={title}
          via="jasonkylesmith"
          /* hashtags={["hashtag"]} */
        >
          <div
            className="share__react-share-container"
            title="Share on Twitter"
          >
            <TwitterIcon size={iconSize} />
          </div>
        </TwitterShareButton>
      )}
      {sources.includes("Email") && (
        <EmailShareButton
          url={`https://preview.jasonkylesmith.com/${directory}/${slug}`}
          subject={`${title} from jasonkylesmith.com`}
        >
          <div className="share__react-share-container" title="Share via Email">
            <EmailIcon size={iconSize} bgStyle={{ fill: "#663cf0" }} />
          </div>
        </EmailShareButton>
      )}
      {sources.includes("Clipboard") && (
        <div className="share__icon-container" title="Copy to Clipboard">
          <CopyToClipboard
            text={`https://preview.jasonkylesmith.com/${directory}/${slug}`}
            onCopy={() => console.log("Copied to Clipboard")}
          >
            <FontAwesomeIcon
              icon={["fas", "clipboard"]}
              className="mx-1 share__icon"
            />
          </CopyToClipboard>
        </div>
      )}
    </div>
  )
}

export default ShareButtons
