import { graphql } from "gatsby"
import React from "react"
import Accordion from "../components/accordion"
import Layout from "../components/layout"
import ModuleWrapper from "../components/module-wrapper"
import Seo from "../components/seo"

const Page = ({ data }) => {
  const { name, modules, navColor, nav, excludeRobots } = data.contentfulPage

  return (
    <Layout navColor={navColor} navSettings={nav}>
      <Seo title={name} excludeRobots={excludeRobots} />

      <div className="">
        {modules &&
          modules.map((module, index) => {
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
      navColor
      excludeRobots
      nav {
        mainLinks {
          name
          navLinkText
          slug
        }
      }

      modules {
        sectionMargin
        overlapNav
        marginVariant
        fullWidth
        backgroundColor
        backgroundImage {
          gatsbyImageData(
            layout: CONSTRAINED

            quality: 100
            resizingBehavior: CROP
            cropFocus: CENTER
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          file {
            url
          }
          description
        }
        name
        headline
        module {
          ... on ContentfulMonthlyClientsData {
            name
            year
            January: isJanFilled
            February: isFebFilled
            March: isMarFilled
            April: isAprFilled
            May: isMayFilled
            June: isJunFilled
            July: isJulFilled
            August: isAugFilled
            September: isSepFilled
            October: isOctFilled
            November: isNovFilled
            December: isDecFilled
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
          }
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
              fontAwesomeIconType
              text {
                text
                childrenMarkdownRemark {
                  html
                }
              }
              image {
                gatsbyImageData(quality: 100)
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
              ... on ContentfulCustomContentPage {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                contentful_id
                featuredImage {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    quality: 100
                    resizingBehavior: CROP
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    aspectRatio: 1.77
                  )
                  title
                }
                slug
                name
              }
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
                    aspectRatio: 1.77
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
                    aspectRatio: 1.77
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
            verticalAlignment
            isHero
            name
            isMobileReversed
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            blocks {
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
                orientation
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
                  gatsbyImageData(
                    quality: 100
                    layout: CONSTRAINED
                    resizingBehavior: FILL
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                  title
                }
              }
              ... on ContentfulContactForm {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                id
                name
                title
                destination
                buttonText
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
                  fontAwesomeIconType
                  text {
                    text
                    childrenMarkdownRemark {
                      html
                    }
                  }
                  image {
                    gatsbyImageData(quality: 100)
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
                textColor
                textAlign
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
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                    resizingBehavior: NO_CHANGE
                  )
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
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  quality: 100
                  layout: CONSTRAINED
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
            variant
            cards {
              ... on ContentfulPricingCard {
                id
                title
                includes
                price
                discountedPrice
                discountText
                category
                highlightText
                body {
                  body
                  childrenMarkdownRemark {
                    html
                  }
                  childMarkdownRemark {
                    html
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
              ... on ContentfulHighlightCard {
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
                        aspectRatio: 1.77
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
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                      )
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
            featuredImages {
              gatsbyImageData(quality: 100)
              description
              title
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
              gatsbyImageData(quality: 100)
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
            orientation
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
              gatsbyImageData(quality: 100)
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
              gatsbyImageData(quality: 100)
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
                gatsbyImageData(quality: 100)
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
