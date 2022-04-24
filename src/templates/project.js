import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/tags"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

export const query = graphql`
  query ($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      contentful_id
      description {
        description
      }
      startDate(formatString: "Do MMM, YYYY")
      title
      tags
      tools {
        contentful_id
        name
        description
      }
      client {
        name
        logo {
          gatsbyImageData(
            width: 400
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          title
        }
        contentful_id
        website
      }
      slug
    }
  }
`

const Project = props => {
  const { title, description, tags, client, tools } =
    props.data.contentfulProject

  return (
    <Layout>
      <Seo title={title} />
    </Layout>
  )
}

export default Project
