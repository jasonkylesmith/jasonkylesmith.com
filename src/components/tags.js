import * as React from "react"

const Tags = props => {
  let disabledClass = ""

  if (props.disabled === true) {
    disabledClass = "tags-disabled"
  }
  return (
    <>
      {props.tags === null ? (
        <span className="blog-tag tags-disabled">no tags</span>
      ) : (
        props.tags.map((tag, index) => {
          return <Tag tag={tag} disabledClass={disabledClass} key={index} />
        })
      )}
    </>
  )
}

export default Tags

const Tag = props => {
  return (
    <>
      <span className={`blog-tag ${props.disabledClass}`}>{props.tag}</span>
    </>
  )
}
