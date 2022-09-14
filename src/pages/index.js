import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"
import Testimonial from "../components/testimonial"
import HighlightCard from "../components/highlight-card"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MarkdownDisplay from "../components/markdown-display"

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
              childrenMarkdownRemark {
                html
              }
            }
            heroTitle
            heroCtaText
            heroPortrait {
              description
              file {
                url
              }
            }
            testimonialsOn
            heroSlider {
              file {
                url
              }
              description
            }
          }
        }
      }
      allContentfulHighlightCard {
        edges {
          node {
            id
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
  const {
    heroBody,
    heroTitle,
    heroCtaText,
    heroPortrait,
    testimonialsOn,
    heroSlider,
  } = data.allContentfulSitewideCopy.edges[0].node
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
    const { className, onClick } = props
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
          className="col-12 d-flex justify-content-center align-items-center p-4 p-md-0"
          style={{ height: "80vh" }}
        >
          <div
            className="hero-text d-flex flex-row hero-container"
            style={{
              backgroundImage: `url(https:${heroPortrait.file.url})`,
              backgroundPosition: "top right",
              backgroundSize: "cover",
            }}
          >
            <div className="p-4 text-white col-12 col-md-6">
              <h1 className="block__heading pe-4 mb-0">{heroTitle}</h1>
              <div className="pe-2">
                <MarkdownDisplay
                  html={heroBody.childrenMarkdownRemark[0].html}
                />
              </div>
              <a href="/contact?destination=hero" className="btn mb-0">
                {heroCtaText}
              </a>
            </div>
            <div className="p-0 d-none d-sm-block flex-fill">
              {/* <img
                src={
                  heroPortrait
                    ? `https:${heroPortrait.file.url}`
                    : "https://picsum.photos/250"
                }
                style={{
                  objectFit: "cover",
                  width: "250px",
                  height: "250px",
                  borderRadius: ".25rem",
                }}
                alt={
                  heroPortrait
                    ? `https:${heroPortrait.description}`
                    : "stand in"
                }
              /> */}
            </div>
          </div>
        </div>
        <div className="row m-0 py-5">
          <div className="col col-md-8 offset-md-2 mb-4 px-4 px-md-0">
            <h2 className="block__heading">What I Do</h2>
            <Slider {...highlightSettings}>
              {highlightCards
                .sort((a, b) => a.node.order - b.node.order)
                .map((card, index) => {
                  return <HighlightCard {...card} key={card.node.id} />
                })}
            </Slider>
          </div>
        </div>
        {testimonialsOn && (
          <div className="row m-0 pb-5">
            <div className="col-12 col-md-8 offset-md-2 px-2 px-md-0">
              <h2 className="block__heading">Testimonials</h2>
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
        )}

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
          {/* <Slider {...sliderSettings}>
            {heroSlider &&
              heroSlider.map(image => {
                return (
                  <div className="slider-div">
                    <img
                      src={`https:${image.file.url}`}
                      loading="lazy"
                      alt={`${image.description}`}
                    />
                  </div>
                )
              })}
          </Slider> */}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
