import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PricingCard from "../components/pricing-card"
import MarkdownDisplay from "../components/markdown-display"

const PrincingPage = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSitewideCopy(filter: { name: { eq: "Basic" } }) {
        edges {
          node {
            pricingBody {
              pricingBody
              childrenMarkdownRemark {
                html
              }
            }
            pricingTitle
          }
        }
      }
      allContentfulPricingCard {
        edges {
          node {
            id
            title
            body {
              childrenMarkdownRemark {
                html
              }
            }
            includes
            price
            discountedPrice
            discountText
            category
          }
        }
      }
    }
  `)

  const { edges: pricingCards } = data.allContentfulPricingCard
  const { pricingTitle, pricingBody } =
    data.allContentfulSitewideCopy.edges[0].node

  return (
    <Layout>
      <Seo title="Pricing" />

      <div className="row mt-4 px-2">
        <div className="col-12 col-lg-12">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="row">
                <div className="col-12">
                  <h1 className="block__heading">{pricingTitle}</h1>

                  <MarkdownDisplay
                    html={pricingBody.childrenMarkdownRemark[0].html}
                  />
                </div>
              </div>
              <div className="row rows-cols-1 rows-cols-lg-2 g-4 mb-4 justify-content-center">
                {pricingCards
                  /* .filter(card => card.node.category[0] === "headshots") */
                  .map((card, index) => {
                    return <PricingCard {...card.node} key={card.node.id} />
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PrincingPage
