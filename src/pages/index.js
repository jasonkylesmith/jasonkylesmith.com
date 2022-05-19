import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"
import Testamonial from "../components/testamonial"

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
    centerMode: true,
    centerPadding: "0px",
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
          className="col-12 d-flex justify-content-center align-items-center p-0"
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
              <p className="pe-4">I take pictures of things sometimes.</p>

              <a href="#" className="btn mb-0">
                Call to action here!
              </a>
            </div>
            <div className="p-0 d-none d-sm-block flex-grow-1">
              <img
                src="https://picsum.photos/250"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-4">
            <Testamonial
              author="Jason Kyle Smith"
              subtitle="Software Engineer with Moonello"
              body="Jason really is great at talking with himself. I know this very well, given that I am he."
              quote="This guy know's his schnozes!"
              image="https://picsum.photos/200"
            />
          </div>
          <div className="col-12 d-flex justify-content-center mb-4">
            <Testamonial
              author="Jason Kyle Smith"
              subtitle="Software Engineer with Moonello"
              body="Jason really is great at talking with himself. I know this very well, given that I am he."
              quote="This guy know's his schnozes!"
              image="https://picsum.photos/200"
              variant="right"
            />
          </div>
          <div className="col-12 d-flex justify-content-center mb-4">
            <Testamonial
              author="Jason Kyle Smith"
              subtitle="Software Engineer with Moonello"
              body="Jason really is great at talking with himself. I know this very well, given that I am he."
              quote="This guy know's his schnozes!"
              image="https://picsum.photos/200"
            />
          </div>
        </div>

        <div
          className="p-0"
          style={{
            height: "85vh",

            position: "absolute",
            top: 0,
            left: 12,
            zIndex: -1,
          }}
        >
          <Slider {...sliderSettings}>
            <div className="slider-div">
              <img src="https://picsum.photos/1300/600" loading="lazy" />
            </div>
            <div className="slider-div">
              <img src="https://picsum.photos/1301/601" loading="lazy" />
            </div>
            <div className="slider-div">
              <img src="https://picsum.photos/1302/602" loading="lazy" />
            </div>
            <div className="slider-div">
              <img src="https://picsum.photos/1300/603" loading="lazy" />
            </div>
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
