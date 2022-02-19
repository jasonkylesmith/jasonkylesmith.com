import React from "react"

const ProjectPreviewCard = props => {
  return (
    <article className="project-card">
      <div className="body">
        <div className="blocker"></div>
        <div className="body-text">
          This is a description about the project, what it is, what it uses, and
          other little details about it.
        </div>
        <img src="https://picsum.photos/500" />
      </div>
      <div className="footer">
        <h3 className="title">sTuDLiesT cAPs</h3>
        <div className="icons d-none d-md-flex">
          <h3>[]</h3>
          <h3>[]</h3>
          <h3>[]</h3>
        </div>
      </div>
    </article>
  )
}

export default ProjectPreviewCard
