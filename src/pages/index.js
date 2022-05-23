import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import heroImage from "../images/standinportrait.png"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"
import Testimonial from "../components/testimonial"
import HighlightCard from "../components/highlight-card"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

library.add(fas)

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTestimonial(limit: 3) {
        edges {
          node {
            id
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
      allContentfulHighlightCard {
        edges {
          node {
            title
            order
            body {
              childrenMarkdownRemark {
                html
              }
            }
            highlight {
              ... on ContentfulBlogPost {
                id
                title
                slug
                featuredImage {
                  gatsbyImageData(
                    quality: 100
                    layout: CONSTRAINED
                    resizingBehavior: FILL
                    aspectRatio: 2
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              ... on ContentfulGallery {
                id
                title: name
                slug
                category
                featuredImage {
                  gatsbyImageData(
                    quality: 100
                    layout: CONSTRAINED
                    resizingBehavior: FILL
                    aspectRatio: 2
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  `)

  const { edges: testimonials } = data.allContentfulTestimonial
  const { heroBody, heroTitle } = data.allContentfulSitewideCopy.edges[0].node
  const { edges: highlightCards } = data.allContentfulHighlightCard

  const SliderNextArrow = props => {
    const { className, onClick } = props
    return (
      <FontAwesomeIcon
        icon={["fas", "angle-right"]}
        className={`${className} highlight__icon--right`}
        onClick={onClick}
      />
    )
  }

  const SliderPrevArrow = props => {
    const { className, style, onClick } = props
    return (
      <FontAwesomeIcon
        icon={["fas", "angle-left"]}
        className={`${className} highlight__icon--left`}
        onClick={onClick}
      />
    )
  }

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

  const highlightSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    lazyLoad: false,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 2,
    className: "highlight__slider",
    easing: "ease-in-out",
    arrows: true,
    fade: false,
    swipe: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
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
              zIndex: "1",
            }}
          >
            <div className="p-0">
              <h1 className="">{heroTitle}</h1>
              <p className="pe-4">{heroBody.heroBody}</p>

              <a href="/contact?destination=hero" className="btn mb-0">
                Call to action here!
              </a>
            </div>
            <div className="p-0 d-none d-sm-block flex-fill">
              <img
                src="https://picsum.photos/250"
                style={{
                  objectFit: "cover",
                  width: "250px",
                  height: "250px",
                }}
                alt="stand in"
              />
            </div>
          </div>
        </div>
        <div className="row m-0">
          <div className="col col-md-8 offset-md-2 mb-4 px-4 px-md-0">
            <h2>What I Do</h2>
            <Slider {...highlightSettings}>
              {highlightCards
                .sort((a, b) => a.node.order - b.node.order)
                .map((card, index) => {
                  return <HighlightCard {...card} key={card.node.id} />
                })}
            </Slider>
          </div>
        </div>
        <div className="row m-0 py-5">
          <div className="col-12 col-md-8 offset-md-2 px-2 px-md-0">
            <h2>Testimonials</h2>
          </div>
          {testimonials.map((testimonial, index) => {
            return (
              <div
                className="col col-md-8 offset-md-2 d-flex justify-content-center mb-4 px-2 px-md-0"
                key={testimonial.node.id}
              >
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
            zIndex: 0,
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
