import React from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GatsbyImage } from "gatsby-plugin-image"
import MarkdownDisplay from "./markdown-display"

library.add(fas)
library.add(fab)
library.add(far)

const IconList = ({ module, isSplitContent }) => {
  const FAIconContainer = ({ name, type }) => {
    let iconType

    switch (type) {
      case "solid":
        iconType = "fas"
        break
      case "brand":
        iconType = "fab"
        break
      case "regular":
        iconType = "far"
        break
      default:
        iconType = "fas"
    }

    return (
      <FontAwesomeIcon
        icon={[iconType, name]}
        className="iconList--svg"
        size="4x"
      />
    )
  }

  const ImageContainer = ({ image }) => {
    const { gatsbyImageData, description } = image

    return (
      <GatsbyImage
        image={gatsbyImageData}
        alt={description}
        className="iconList__container--image m-0"
      />
    )
  }

  const ContentWrapper = ({ children, variant, size }) => {
    return (
      <div className={`iconList__container--wrapper`}>
        <div className={`iconList__container--item ${variant}`}>{children}</div>
      </div>
    )
  }

  const { variant, iconSize, icons } = module

  // variant: default, staggered
  // iconSize: lg, sm

  return (
    <div
      className={`iconList__container ${variant} ${iconSize} ${
        isSplitContent && "splitContent"
      }`}
    >
      {icons.map((icon, index) => {
        const { image, variant, fontAwesomeIcon, fontAwesomeIconType, text } =
          icon

        if (variant === "text-only") {
          // text only version

          if (iconSize !== "sm") {
            return (
              <ContentWrapper variant={variant} key={index}>
                <MarkdownDisplay props={text.childrenMarkdownRemark[0]} />
              </ContentWrapper>
            )
          } else {
            return <></>
          }
        } else {
          // contains an image or icon, so text-icon or icon-only
          const asset = image ? (
            <ImageContainer image={image} />
          ) : (
            <FAIconContainer
              name={fontAwesomeIcon}
              type={fontAwesomeIconType}
            />
          )

          if (variant === "icon-text") {
            // both icon and text

            return (
              <ContentWrapper variant={variant} key={index}>
                {asset}
                {iconSize !== "sm" && (
                  <MarkdownDisplay props={text.childrenMarkdownRemark[0]} />
                )}
              </ContentWrapper>
            )
          } else {
            // only icon

            return (
              <ContentWrapper variant={variant} key={index}>
                {asset}
              </ContentWrapper>
            )
          }
        }
      })}
    </div>
  )
}

export default IconList
