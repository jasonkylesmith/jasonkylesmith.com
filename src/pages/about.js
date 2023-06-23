import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import MarkdownDisplay from "../components/markdown-display"
import LivePlaceholder from "../components/live-placeholder"

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

  return process.env.GATSBY_ENVIRONMENT === "live" ? (
    <LivePlaceholder />
  ) : (
    <Layout>
      <Seo title="About" />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="row mb-4">
              <div className=" col-12 col-lg-7 order-1 order-lg-1">
                <h2 className="mb-1 block__heading">{aboutTitle}</h2>
                <MarkdownDisplay
                  html={aboutBody.childrenMarkdownRemark[0].html}
                />
                {/* Start DEMO */}
                <h2 className="mb-1 block__heading">Why Photography?</h2>
                <MarkdownDisplay
                  html={aboutWhyPhotography.childrenMarkdownRemark[0].html}
                />
                {/* End DEMO */}
                <a href="/contact?destination=about" className="btn mb-0">
                  {aboutCtaText}
                </a>
              </div>
              <div className="col-12 col-lg-5 order-0 order-lg-0 mb-4 mb-lg-0">
                <img
                  src={`https:${aboutPortrait.file.url}`}
                  className="img-fluid"
                  alt={aboutPortrait.description}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col mt-4 about-slider"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
