import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab)

const WebDevelopment = props => {
  return (
    <Layout>
      <Seo title="Web Development" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-1 mt-4 mt-md-0 d-flex flex-column justify-content-center">
            <div className="align-self-start">
              <h1 className="m-0">Web Development</h1>
              <p>
                I am a front-end web developer who focuses on the classics of
                HTML, CSS, and JavaScript with heavy use of React to build
                elegant, smooth, and pleasing websites. Though my formal work in
                web development is recent, I've had an off-and-on relationship
                with different web technologies for close to 20 years. Recently,
                I've really begun to lean into the Jamstack concept of using a
                content management system and static-site generator to build
                sites.
              </p>
            </div>
            <div className="row">
              <div className="col-7"></div>
              <div className="col-5">
                <h4>Languages, Frameworks, and Libraries of Note</h4>
                <FontAwesomeIcon icon={["fab", "html5"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "css3-alt"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "js-square"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "react"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "bootstrap"]} size="2x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WebDevelopment
