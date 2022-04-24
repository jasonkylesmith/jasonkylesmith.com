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
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "85vh" }}
    >
      <div className="hero-text">
        <h1 className="">Hi, I'm Jason.</h1>
        <p>
          I'm a photographer in southeast Michigan specializing in portraiture
          and nature photography.
        </p>

        <a href="#" className="btn">
          CAN I TAKE YOUR PORTRAIT?
        </a>
      </div>
      {/* <img src={heroImage} alt="stand in for myself" className="hero-image" /> */}
    </div>
  </Layout>
)

export default IndexPage
