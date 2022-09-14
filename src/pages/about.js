import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"
import MarkdownDisplay from "../components/markdown-display"

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
            aboutCtaText
            aboutTitle
            aboutPortrait {
              description
              file {
                url
              }
            }
          }
        }
      }
    }
  `)

  const { aboutBody, aboutTitle, aboutCtaText, aboutPortrait } =
    data.allContentfulSitewideCopy.edges[0].node

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
              <div className=" col-12 col-lg-7 order-1 order-lg-1 ps-2 pe-0">
                <h1 className="blog-title block__heading">{aboutTitle}</h1>
                <MarkdownDisplay
                  html={aboutBody.childrenMarkdownRemark[0].html}
                />
                {/* Start DEMO */}
                <h1 className="blog-title block__heading">Why Photography?</h1>
                <p>
                  I really didn't understand the real meaning of my photography
                  until a few years ago. My wife was dog sitting for a longtime
                  friend of hers with two wonderful pups, both getting a bit
                  long in the tooth and absolutely loved by their family. I had
                  never photographed pets before, so with the wife at work, I
                  decided to setup a mini-photoshoot with the doggos.
                </p>
                <p>
                  After the shoot and I got the keepers edited and touched up,
                  we gifted two photos to them with frame, matte, and
                  everything. I can still remember the look on their faces when
                  we gave them those photos, you could tell they were just so
                  appreciative! Over the next few years, our four-legged friends
                  passed away and though I'd rather they still be around, it
                  felt so good knowing that the family still had photos taken
                  right before their health declined.
                </p>
                <p>
                  That feeling of knowing that I had captured something so
                  special, so useful, so cherished; well, let's just say I
                  continue to chase that feeling in my photography today.
                </p>
                {/* End DEMO */}
                <a href="/contact?destination=about" className="btn mb-0">
                  {aboutCtaText}
                </a>
              </div>
              <div className="col-12 col-lg-5 order-0 order-lg-0 mb-4 mb-lg-0 ps-0">
                <img
                  src={`https:${aboutPortrait.file.url}`}
                  className="img-fluid"
                  alt={aboutPortrait.description}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col ps-0 mt-4 about-slider">
                {/* <Slider {...aboutSliderSettings}>
                  {aboutSliderGallery.map(image => {
                    return (
                      <div className="about">
                        <img
                          src={`http:${image.file.url}`}
                          alt={image.description}
                        />
                      </div>
                    )
                  })}
                </Slider> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
