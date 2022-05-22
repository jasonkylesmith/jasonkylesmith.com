import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PricingCard from "../components/pricing-card"

const PrincingPage = props => {
  const data = useStaticQuery(graphql`
    query {
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

  return (
    <Layout>
      <Seo title="Pricing" />

      <div className="row mt-4 px-2">
        <div className="col-12 col-lg-12">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="row rows-cols-1 rows-cols-lg-2 g-4">
                {pricingCards.map((card, index) => {
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
