import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    {/*     <div className="d-flex flex-column vh-100 justify-content-center hero">
      <h1 className="">Hi, I'm Jason.</h1>
      <p>Welcome to my collection of all the things I love to do.</p>
      <p>
        <a href="#" className="btn">
          SEE MY RECENT WORK
        </a>
      </p>
    </div> */}
    <div className="d-flex flex-column vh-100 justify-content-center">
      <div className="hero-text">
        <h1 className="">Hi, I'm Jason.</h1>
        <p>Welcome to my collection of all the things I love to do.</p>
        <p>
          <a href="#" className="btn">
            SEE MY RECENT WORK
          </a>
        </p>
      </div>
      <img src={heroImage} className="hero-image" />
      <div className="hero-pointer">
        <a href="#" className="btn scroll">
          V
        </a>
      </div>
    </div>
    <div className="mt-4">
      <h2>More Down Here!</h2>
    </div>
  </Layout>
)

export default IndexPage
