import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/tags"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

export const query = graphql`
  query ($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
      contentful_id
      name
    }
  }
`

const Gallery = props => {
  /* const { title, description, tags, client, tools } =
    props.data.contentfulProject */

  const { name } = props.data.contentfulGallery

  console.log("This is the name", name)

  return (
    <Layout>
      <Seo title={name} />
      <h1>{name}</h1>
      {/* Gallery Tests */}
      <div className="block-left-float">
        <img src="https://picsum.photos/300/400" className="main-img" />
        <div>
          <h2>Header 2 Title</h2>
          <h6>Header 6 Subtitle</h6>
          <p>
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text.
          </p>
        </div>
      </div>

      <div className="block-lg-landscape-bottom-text">
        <img src="https://picsum.photos/1920/1080" className="main-img" />
        <div>
          <h2>Header 2 Title</h2>
          <h6>Header 6 Subtitle</h6>
          <p>
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text. This is
            body text. This is body text. This is body text. This is body text.
            This is body text. This is body text. This is body text.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Gallery
