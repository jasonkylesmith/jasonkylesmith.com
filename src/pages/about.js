import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

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
            aboutWhyPhotography {
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

  const {
    aboutBody,
    aboutWhyPhotography,
    aboutTitle,
    aboutCtaText,
    aboutPortrait,
  } = data.allContentfulSitewideCopy.edges[0].node

  return (
    <Layout>
      <Seo title="About | Jason Kyle Smith" />
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
                <MarkdownDisplay
                  html={aboutWhyPhotography.childrenMarkdownRemark[0].html}
                />
                {/* End DEMO */}
                <a href="/contact?destination=about" className="btn mb-0">
                  {aboutCtaText}
                </a>
              </div>
              <div className="col-12 col-lg-5 order-0 order-lg-0 mb-4 mb-lg-0 px-0 ps-md-0 pe-md-2">
                <img
                  src={`https:${aboutPortrait.file.url}`}
                  className="img-fluid"
                  alt={aboutPortrait.description}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col ps-0 mt-4 about-slider"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
