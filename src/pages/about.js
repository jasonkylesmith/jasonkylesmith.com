import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"

const AboutPage = () => {
  return (
    <Layout>
      <Seo title="Home" />

      <div
        className="row p-0 position-relative mt-2"
        style={{ height: "85vh" }}
      >
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="row justify-content-center align-items-center pb-5">
            <div
              className="d-flex flex-lg-row flex-column col-12 "
              style={{
                backgroundColor: "rgba(255,255,255,.8)",
                padding: "1rem",
                borderRadius: ".25rem",
              }}
            >
              <div className="p-0 d-flex align-items-end col-12 col-lg-6 order-2 order-lg-1">
                <div>
                  <h1 className="m-0">I'm Jason. Hi!</h1>
                  <span className="small">Pleased to meet you!</span>
                  <p className="pe-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Eu tincidunt tortor aliquam nulla facilisi cras.
                    Semper eget duis at tellus. Nulla facilisi etiam dignissim
                    diam. Sodales ut eu sem integer vitae justo. Aliquet
                    sagittis id consectetur purus ut faucibus pulvinar
                    elementum. Ullamcorper sit amet risus nullam eget felis
                    eget. Ultricies lacus sed turpis tincidunt id aliquet risus
                    feugiat. Duis at tellus at urna. Ut morbi tincidunt augue
                    interdum velit euismod in pellentesque. Nisl suscipit
                    adipiscing bibendum est ultricies. Elementum sagittis vitae
                    et leo. In mollis nunc sed id semper risus in. Vel facilisis
                    volutpat est velit egestas dui id. Mattis nunc sed blandit
                    libero volutpat sed cras. Morbi enim nunc faucibus a
                    pellentesque sit amet porttitor.
                  </p>

                  <a href="#" className="btn mb-0">
                    Call to action here!
                  </a>
                </div>
              </div>
              <div className="p-0 col-12 col-lg-6 order-1 order-lg-2 d-none d-lg-flex">
                <img
                  src={heroImage}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                width: "600px",
                padding: "1rem",
                paddingBottom: "75%",
              }}
              className="hero-text col-12 col-lg-6 pb-5"
            ></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
