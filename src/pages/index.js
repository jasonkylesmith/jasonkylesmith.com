import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"

const IndexPage = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    lazyLoad: false,
    autoplaySpeed: 7000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slider-div",
    centerMode: false,
    centerPadding: "60px",
    cssEase: "linear",
    arrows: false,
    appendDots: dots => <ul>{dots}</ul>,
    fade: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    swipe: false,
  }

  return (
    <Layout>
      <Seo title="Home" />

      <div className="row p-0 position-relative mt-2">
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "85vh" }}
        >
          <div
            className="hero-text d-flex flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,.8)",
              padding: "1rem",
              borderRadius: ".25rem",
            }}
          >
            <div className="p-0">
              <h1 className="">Hi, I'm Jason.</h1>
              <p className="pe-2">I take pictures of things sometimes.</p>

              <a href="#" className="btn mb-0">
                Call to action here!
              </a>
            </div>
            <div className="p-0 d-none d-sm-block flex-grow-1">
              <img
                src="http://picsum.photos/250"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        <div
          className="p-0"
          style={{
            height: "85vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <Slider {...sliderSettings}>
            <div className="slider-div">
              <img src="https://picsum.photos/3000/2000" loading="lazy" />
            </div>
            <div className="slider-div">
              <img src="https://picsum.photos/3000/3001" loading="lazy" />
            </div>
            <div className="slider-div">
              <img src="https://picsum.photos/3000/3000" loading="lazy" />
            </div>
            <div className="slider-div">
              <img src="https://picsum.photos/3001/2000" loading="lazy" />
            </div>
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
