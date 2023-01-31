import { graphql } from "gatsby"
import React from "react"
import Accordion from "../components/accordion"
import Layout from "../components/layout"
import ModuleWrapper from "../components/module-wrapper"
import Seo from "../components/seo"

const Page = ({ data }) => {
  const { name, modules } = data.contentfulPage

  return (
    <Layout>
      <Seo title={name} />
      <div className="mb-5">
        {modules.map((module, index) => {
          return <ModuleWrapper props={module} key={index} />
        })}
      </div>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      name
      slug
      modules {
        sectionMargin
        fullWidth
        backgroundColor
        name
        headline
        module {
          ... on ContentfulAccordion {
            allowMultipleExpanded
            allowZeroExpanded
            preExpanded
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            items {
              contentful_id
              body {
                body
                childrenMarkdownRemark {
                  html
                }
              }
              heading {
                heading
                childrenMarkdownRemark {
                  html
                }
              }
            }
          }
          ... on ContentfulIconList {
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            id
            name
            iconSize
            variant
            icons {
              variant
              fontAwesomeIcon
              text {
                text
                childrenMarkdownRemark {
                  html
                }
              }
              image {
                gatsbyImageData
                file {
                  url
                  details {
                    image {
                      height
                      width
                    }
                  }
                }
                title
                description
              }
            }
          }
          ... on ContentfulContentPageList {
            id
            name
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            pages {
              ... on ContentfulBlogPost {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                contentful_id
                title
                id
                slug
                featured
                publishedDate(formatString: "Do MMMM, YYYY")
                fullDate: publishedDate
                tags
                featuredImage {
                  title
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    quality: 100
                    resizingBehavior: CROP
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    aspectRatio: 2
                  )
                }
                excerpt {
                  childMarkdownRemark {
                    excerpt(pruneLength: 360)
                  }
                }
              }
              ... on ContentfulGallery {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                contentful_id
                name
                slug
                category
                order
                featuredImage {
                  title
                  gatsbyImageData(
                    quality: 100
                    layout: CONSTRAINED
                    resizingBehavior: FILL
                    aspectRatio: 2
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
          ... on ContentfulSplitContent {
            fullWidth
            ratio
            name
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            blocks {
              ... on ContentfulIconList {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                id
                name
                iconSize
                variant
                icons {
                  variant
                  fontAwesomeIcon
                  text {
                    text
                    childrenMarkdownRemark {
                      html
                    }
                  }
                  image {
                    gatsbyImageData
                    file {
                      url
                      details {
                        image {
                          height
                          width
                        }
                      }
                    }
                    title
                    description
                  }
                }
              }
              ... on ContentfulCopy {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                id
                name
                text {
                  text
                  childrenMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulImage {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                id
                name
                image {
                  gatsbyImageData
                  description
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
              }
            }
          }
          ... on ContentfulCarousel {
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            slides {
              id
              client
              quote
              subtitle
              body
              image {
                gatsbyImageData(
                  width: 200
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  quality: 100
                )
                description
              }
            }
          }
          ... on ContentfulCardList {
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            cards {
              id
              title
              body {
                body
                childrenMarkdownRemark {
                  html
                }
              }
              order
              highlight {
                ... on ContentfulBlogPost {
                  id
                  title
                  slug
                  featuredImage {
                    gatsbyImageData(
                      quality: 100
                      layout: CONSTRAINED
                      resizingBehavior: FILL
                      aspectRatio: 2
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
                ... on ContentfulGallery {
                  id
                  title: name
                  slug
                  category
                  featuredImage {
                    gatsbyImageData(
                      quality: 100
                      layout: CONSTRAINED
                      resizingBehavior: FILL
                      aspectRatio: 2
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
            }
          }
          ... on ContentfulHero {
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            name
            headline
            copy {
              copy
              childrenMarkdownRemark {
                html
              }
            }
            ctaButton {
              name
              text
              destination
            }
            backgroundImage {
              file {
                details {
                  image {
                    height
                    width
                  }
                }
                url
              }
              description
              gatsbyImageData
              title
            }
          }
          ... on ContentfulBlockGallery {
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            id
            name
            columns
            variant
            images {
              file {
                details {
                  image {
                    height
                    width
                  }
                }
                url
              }
              description
              gatsbyImageData
              title
            }
          }
          ... on ContentfulClientGallery {
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            id
            name
            hideImage
            downloadLink
            contentful_id
            featuredImage {
              description
              gatsbyImageData
              title
            }
            nextDueDate
            photoshootDate
            status
            slug
            photos {
              photoName
              photoStatus
              photographerRating
              clientFavorite
              photo {
                file {
                  details {
                    image {
                      height
                      width
                    }
                  }
                  url
                }
                gatsbyImageData
                title
                description
                contentful_id
              }
            }
          }
        }
      }
    }
  }
`
