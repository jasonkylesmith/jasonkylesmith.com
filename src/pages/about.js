import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"

const AboutPage = () => {
  const aboutSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    arrows: false,
    dots: true,
    swipe: true,
    infinite: true,
    focusOnSelect: true,
    rows: 1,
  }

  return (
    <Layout>
      <Seo title="About" />
      <div className="container-fluid p-0 mt-4">
        <div className="row p-0">
          <div className="col-md-8 offset-md-2">
            <div className="row mb-4">
              <div className=" col-12 col-lg-5 order-1 order-lg-0">
                <h1 className="blog-title">Hi, I'm Jason!</h1>
                <p>
                  I'm a photographer from Southeast Michigan and I love to
                  photograph just about everything. Travel and nature
                  photography is my stress reliever, portrait and headshot
                  photography is my bread-and-butter. I'm most inspired by the
                  unique, the colorful, and the expressive sights of the world
                  around me and strive to photograph my subjects true to how I
                  see them.
                </p>
                <p>
                  I am currently available to schedule for portrait and headshot
                  sessions!
                </p>
                <a href="#" className="btn mb-0">
                  Call to action here!
                </a>
              </div>
              <div className="col-12 col-lg-7 order-0 order-lg-1 mb-4 mb-lg-0">
                <img
                  src="https://picsum.photos/600/400"
                  className="img-fluid"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <Slider {...aboutSliderSettings}>
                  <div>
                    <img
                      src="https://picsum.photos/300/200"
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <img
                      src="https://picsum.photos/300/200"
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <img
                      src="https://picsum.photos/300/200"
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <img
                      src="https://picsum.photos/300/200"
                      className="img-fluid"
                    />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
