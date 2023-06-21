/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta, title, photo, url }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
    >
      <title>{`${title} | Jason Kyle Smith Photography`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/*       <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      /> */}
      <meta property="og:type" content={"website"} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:url"
        content={url ? url : `https://www.jasonkylesmith.com`}
      />
      <meta
        property="og:image"
        content={
          photo
            ? `https:${photo}`
            : `https://images.ctfassets.net/zidjz73fa9st/6JoQ8LxQyK8xCyJinQS02U/62a1cffa04dd030f152405b63070fe3b/og-image-general.webp`
        }
      />
      <meta property="og:image:width" content={"1200"} />
      <meta property="og:image:height" content={"600"} />
      <meta
        property="og:image:alt"
        content={`${title} | Jason Kyle Smith Photography`}
      />
      <meta property="og:site_name" content="Jason Kyle Smith" />
      <meta property="og:see_also" content="JKS" />
      <meta property="og:see_also" content="Jason Kyle Smith Photography" />
      <meta property="og:see_also" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:title"
        content={`${title} | Jason Kyle Smith Photography`}
      />
      <meta name="twitter:site" content="Jason Kyle Smith" />
      <meta
        name="twitter:image"
        content={
          photo
            ? `https:${photo}`
            : `https://images.ctfassets.net/zidjz73fa9st/6JoQ8LxQyK8xCyJinQS02U/62a1cffa04dd030f152405b63070fe3b/og-image-general.webp`
        }
      />
      <meta name="twitter:creator" content={"@jasonkylesmith"} />
      <meta
        name="twitter:url"
        content={url ? url : `https://www.jasonkylesmith.com`}
      />

      <meta
        property="twitter:image:alt"
        content={`${title} | Jason Kyle Smith Photography`}
      />

      <meta name="robots" content="NOINDEX, NOFOLLOW" />
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
