import * as React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

library.add(fab, fas)

const PostNav = props => {
  console.log("Props", props.edges)
  const { edges } = props

  return (
    <div className="post-nav">
      {edges.prev && (
        <div className="post-nav-wrapper">
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />{" "}
          <Nav
            slug={edges.prev.slug}
            title={edges.prev.title}
            direction="Previous"
          />
        </div>
      )}

      {edges.next && (
        <div className="post-nav-wrapper">
          <Nav
            slug={edges.next.slug}
            title={edges.next.title}
            direction="Next"
          />{" "}
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </div>
      )}
    </div>
  )
}

const Nav = props => {
  return <Link to={`/blog/${props.slug}`}>{props.title}</Link>
}

export default PostNav
