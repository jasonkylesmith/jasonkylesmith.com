import { navigate } from "gatsby"
import React from "react"

// https://eng.wealthfront.com/2020/10/01/building-a-truly-accessible-clickable-div/

const ProjectPreviewCard = props => {
  const { title, excerpt, slug } = props.node.node

  return (
    <button
      className="project-card"
      onClick={() => navigate(`/projects/${slug}`)}
      tabindex={0}
    >
      <div className="body">
        <div className="blocker"></div>
        <div className="body-text">{excerpt.excerpt}</div>
        <img src="https://picsum.photos/500" />
      </div>
      <div className="footer">
        <h3 className="title">{title}</h3>
        <div className="icons d-none d-md-flex">
          <h3>[]</h3>
          <h3>[]</h3>
          <h3>[]</h3>
        </div>
      </div>
    </button>
  )
}

export default ProjectPreviewCard
