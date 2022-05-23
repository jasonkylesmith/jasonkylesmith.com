import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSitewideCopy(filter: { name: { eq: "Basic" } }) {
        edges {
          node {
            aboutBody {
              childrenMarkdownRemark {
                html
              }
            }
            aboutTitle
          }
        }
      }
    }
  `)

  const { aboutBody, aboutTitle } = data.allContentfulSitewideCopy.edges[0].node

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
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <Layout>
      <Seo title="About Me" />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="row mb-4">
              <div className=" col-12 col-lg-6 order-1 order-lg-1 ps-2 pe-0">
                <h1 className="blog-title">{aboutTitle}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: aboutBody.childrenMarkdownRemark[0].html,
                  }}
                />
                {/* <p>
                  I'm a photographer from Southeast Michigan and I love to
                  photograph just about everything. Capturing nature is my
                  stress reliever, portrait and headshot photography is my
                  bread-and-butter. I'm most inspired by the unique, the
                  colorful, and the expressive sights of the world around me and
                  strive to photograph my subjects true to how I see them.
                </p>
                <p>
                  I feel like a person's beauty is made up of their pleasing
                  features AND flaws, so I do my best to capture both and create
                  an image of the subject's authentic self. This is my number
                  one goal when making portraits of people.
                </p>
                <p>
                  I am currently available to schedule for portrait and headshot
                  sessions!
                </p> */}
                <a href="/contact?destination=about" className="btn mb-0">
                  Call to action here!
                </a>
              </div>
              <div className="col-12 col-lg-6 order-0 order-lg-0 mb-4 mb-lg-0 ps-0">
                <img
                  src="https://picsum.photos/600/400"
                  className="img-fluid"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col ps-0 mt-4">
                <Slider {...aboutSliderSettings}>
                  <div className="about">
                    <img
                      src="https://picsum.photos/450/300"
                      className="img-fluid"
                    />
                  </div>
                  <div className="about">
                    <img
                      src="https://picsum.photos/450/300"
                      className="img-fluid"
                    />
                  </div>
                  <div className="about">
                    <img
                      src="https://picsum.photos/450/300"
                      className="img-fluid"
                    />
                  </div>
                  <div className="about">
                    <img
                      src="https://picsum.photos/450/300"
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
