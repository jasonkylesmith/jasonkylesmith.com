import React from "react"

const Link = ({ data, className }) => {
  const { text, destination } = data

  let link
  let target

  if (destination[0] === "/") {
    link = destination
    target = "_self"
  } else if (
    destination.slice(0, 4) === "http" ||
    destination.slice(0, 5) === "https"
  ) {
    link = destination
    target = "_blank"
  } else {
    link = null
  }

  return link ? (
    <a
      href={link}
      className={className}
      target={target}
      rel={target === "_blank" ? "noreferrer" : "me"}
    >
      {text}
    </a>
  ) : (
    <></>
  )
}

export default Link
