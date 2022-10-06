import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BlockStory from "../components/block-story"
import BlockGallery from "../components/block-gallery"
import BlockFeature from "../components/block-feature"
import ShareButtons from "../components/share-buttons"

// Lightbox Library https://www.lightgalleryjs.com/docs/react/

export const query = graphql`
  query ($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
      contentful_id
      name
      featuredImage {
        file {
          url
        }
      }
      category
      slug
      blocks {
        ... on ContentfulBlockFeature {
          id
          name
          variant
          blockItems {
            ... on ContentfulBlockItemImage {
              id
              sys {
                contentType {
                  sys {
                    id
                  }
                }
              }
              image {
                gatsbyImageData(
                  quality: 100
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
                description
              }
              caption
              includeCaption
            }
            ... on ContentfulBlockItemText {
              id
              sys {
                contentType {
                  sys {
                    id
                  }
                }
              }
              text {
                raw
              }
            }
          }
          sys {
            contentType {
              sys {
                id
              }
            }
          }
        }
        ... on ContentfulBlockGallery {
          id
          name
          images {
            id
            description
            gatsbyImageData(
              breakpoints: [200, 400, 600, 800, 1000, 1600]
              sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            file {
              url
              details {
                image {
                  height
                  width
                }
              }
            }
          }
          variant
          sys {
            contentType {
              sys {
                id
              }
            }
          }
        }
        ... on ContentfulBlockStory {
          id
          name
          image {
            id
            gatsbyImageData(
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            description
          }
          imageFloat
          sys {
            contentType {
              sys {
                id
              }
            }
          }
          text {
            raw
          }
        }
      }
    }
  }
`

const Gallery = props => {
  /* const { title, description, tags, client, tools } =
    props.data.contentfulProject */

  const { blocks, name, category, slug, featuredImage } =
    props.data.contentfulGallery

  return (
    <Layout>
      <Seo
        title={name}
        url={`https://www.jasonkylesmith.com/${category}/${slug}`}
        photo={featuredImage.file.url}
      />

      <div className="row mt-4 px-2">
        <div className="col-sm-8 offset-sm-2 mb-2 pb-5">
          <ShareButtons
            title={name}
            slug={slug}
            directory={category.toLowerCase().replace(/\s+/g, "")}
            sources={["Facebook", "Twitter", "Email", "Clipboard"]}
          />

          <h1 className="block__heading">{name}</h1>

          {blocks.map(block => {
            const { id } = block.sys.contentType.sys

            if (id === "blockStory") {
              return (
                <div key={block.id}>
                  <BlockStory block={block} />
                </div>
              )
            }

            if (id === "blockFeature") {
              return (
                <div key={block.id}>
                  <BlockFeature block={block} />
                </div>
              )
            }

            if (id === "blockGallery") {
              return (
                <div key={block.id}>
                  <BlockGallery block={block} />
                </div>
              )
            }

            return null
          })}
          {category === "Portraiture" && (
            <div className="text-center mt-4">
              <a
                href={`/contact?destination=${slug}`}
                className="btn mb-0 mt-4"
              >
                Interested in making a photo together?
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Gallery
