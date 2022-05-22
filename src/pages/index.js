import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"
import Testimonial from "../components/testimonial"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTestimonial(limit: 3) {
        edges {
          node {
            client
            quote
            subtitle
            image {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                quality: 100
              )
              description
            }
          }
        }
      }
      allContentfulSitewideCopy(filter: { name: { eq: "Basic" } }) {
        edges {
          node {
            heroBody {
              heroBody
            }
            heroTitle
          }
        }
      }
    }
  `)

  const { edges: testimonials } = data.allContentfulTestimonial
  const { heroBody, heroTitle } = data.allContentfulSitewideCopy.edges[0].node

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
              <h1 className="">{heroTitle}</h1>
              <p className="pe-4">{heroBody.heroBody}</p>

              <a href="https://#" className="btn mb-0">
                Call to action here!
              </a>
            </div>
            <div className="p-0 d-none d-sm-block flex-fill">
              <img
                src="https://picsum.photos/250"
                style={{ objectFit: "cover", width: "250px", height: "250px" }}
                alt="stand in"
              />
            </div>
          </div>
        </div>
        <div className="row">
          {testimonials.map((testimonial, index) => {
            return (
              <div className="col col-md-8 offset-md-2 d-flex justify-content-center mb-4 px-2 px-md-0">
                <Testimonial
                  {...testimonial.node}
                  variant={index % 2 === 1 ? "left" : "right"}
                />
              </div>
            )
          })}
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
              <img
                src="https://picsum.photos/1300/600"
                loading="lazy"
                alt="stand in"
              />
            </div>
            <div className="slider-div">
              <img
                src="https://picsum.photos/1301/601"
                loading="lazy"
                alt="stand in"
              />
            </div>
            <div className="slider-div">
              <img
                src="https://picsum.photos/1302/602"
                loading="lazy"
                alt="stand in"
              />
            </div>
            <div className="slider-div">
              <img
                src="https://picsum.photos/1300/603"
                loading="lazy"
                alt="stand in"
              />
            </div>
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
