require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Jason Kyle Smith Photography`,
    description: `Jason Kyle Smith is a creative from the Southeast Michigan area focusing on photography and web development.`,
    author: `Jason Kyle Smith`,
    siteUrl: `https://www.jasonkylesmith.com`,
  },
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/ico.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    /* {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: true,
        defaultDataLayer: { platform: "website" },
        routeChangeEventName: "gatsby-route-change",
      },
    }, */
  ],
}
