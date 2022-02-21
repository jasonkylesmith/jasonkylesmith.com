import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { graphql, navigate, useStaticQuery } from "gatsby"
import DoubleColumnHightlight from "../components/gallery/double-column-highlight"
import ProjectPreviewCard from "../components/gallery/project-preview-card"

library.add(fab)

const WebDevelopment = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulProject {
        edges {
          node {
            contentful_id
            slug
            title
            excerpt {
              excerpt
            }
          }
        }
      }
    }
  `)

  const { edges } = data.allContentfulProject

  return (
    <Layout>
      <Seo title="Web Development" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 offset-md-1 mt-4 mt-md-0 d-flex flex-column">
            <h1>Web Development</h1>
            <div
              className="d-flex flex-row justify-content-between align-items-center"
              style={{ flexWrap: "wrap" }}
            >
              {edges.map((node, index) => {
                return (
                  <ProjectPreviewCard
                    node={node}
                    key={`${node.title}${index}`}
                  />
                )
              })}
            </div>

            {/* 
            <div className="align-self-start">
              <h1 className="m-0">Web Development</h1>
              <p>
                I am a front-end web developer who focuses on the classics of
                HTML, CSS, and JavaScript with heavy use of React to build
                elegant, smooth, and pleasing websites. Though my formal work in
                web development is recent, I've had an off-and-on relationship
                with different web technologies for close to 20 years. I work
                for a software development company (
                <a href="https://moonello.com" target="_new">
                  Moonello
                </a>
                ) as a software engineer focusing on hybrid mobile application
                projects.
              </p>
              <h3>2022 Goals</h3>
              <p>
                In 2022, I'd definitely like to focus a bit on some personal
                projects, things to do solo that will let me learn and
                experience at my own pace.
              </p>
              <h4>Target Projects</h4>
              <ul>
                <li>jasonkylesmith.com Portfolio Website</li>
                <li>Discord Bot</li>
                <li>A Client Website</li>
                <li>React Native Applicaation</li>
              </ul> 
            </div>
            <div className="row">
              <div className="col-12">
                <h3>Languages, Frameworks, and Libraries of Note</h3>
                <FontAwesomeIcon
                  icon={["fab", "html5"]}
                  size="2x"
                  className="me-2"
                />
                <FontAwesomeIcon
                  icon={["fab", "css3-alt"]}
                  size="2x"
                  className="me-2"
                />
                <FontAwesomeIcon
                  icon={["fab", "js-square"]}
                  size="2x"
                  className="me-2"
                />
                <FontAwesomeIcon
                  icon={["fab", "react"]}
                  size="2x"
                  className="me-2"
                />
                <FontAwesomeIcon
                  icon={["fab", "bootstrap"]}
                  size="2x"
                  className="me-2"
                />
              </div>
            </div>
            <DoubleColumnHightlight />
             */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WebDevelopment
