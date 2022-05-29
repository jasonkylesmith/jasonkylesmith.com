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
              <div className="row">
                <div className="col-12">
                  <h1 className="block__heading">Pricing and Investment</h1>
                  <p>
                    Here is where we put something about pricing and investment
                    being such a good idea.
                  </p>
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
