const path = require("path")

let excludedPages = ["test"]
let exclude = false

exports.createPages = async ({ graphql, actions }) => {
  let envExclude = []

  switch (process.env.GATSBY_ENVIRONMENT) {
    case "live":
      envExclude = ["development", "preview"]
      break
    case "preview":
      envExclude = ["development"]
      break
    default:
      envExclude = []
  }

  const { createPage } = actions

  const response = await graphql(`
    query {
      allContentfulPage {
        edges {
          node {
            slug
            envLevel
          }
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            slug
            publishedDate
          }
        }
      }
      allContentfulGallery {
        distinct(field: { category: SELECT })
        edges {
          node {
            slug
            category
          }
        }
      }
      allContentfulClientGallery {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  response.data.allContentfulPage.edges.forEach(edge => {
    if (process.env.GATSBY_ENVIRONMENT === "live") {
      createPage({
        path: "/",
        component: path.resolve("./src/templates/temp.js"),
        context: {},
      })
    }

    if (!envExclude.includes(edge.node.envLevel)) {
      if (excludedPages.includes(edge.node.slug)) {
        if (!exclude) {
          createPage({
            path: edge.node.slug === "home" ? "/" : `/${edge.node.slug}`,
            component: path.resolve("./src/templates/page.js"),
            context: {
              slug: edge.node.slug,
            },
          })
        }
      } else {
        createPage({
          path: edge.node.slug === "home" ? "/" : `/${edge.node.slug}`,
          component: path.resolve("./src/templates/page.js"),
          context: {
            slug: edge.node.slug,
          },
        })
      }
    }

    //if (edge.node.slug !== "test") {
    /*     if (true) { */
    //createPage({
    //path: edge.node.slug === "home" ? "/" : `/${edge.node.slug}`,
    //component: path.resolve("./src/templates/page.js"),
    //context: {
    //  slug: edge.node.slug,
    // },
    //})
    //}
  })

  if (process.env.GATSBY_ENVIRONMENT !== "live") {
    /* 
      TEMPORARILY PREVENT FROM APPEARING ON LIVE
    */

    if (process.env.GATSBY_ENVIRONMENT === "development") {
      response.data.allContentfulBlogPost.edges.forEach(edge => {
        if (edge.node.slug !== "demo-post") {
          createPage({
            path: `/blog/${edge.node.slug}`,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              slug: edge.node.slug,
            },
          })
        }
      })
    } else {
      const today = new Date()

      response.data.allContentfulBlogPost.edges.forEach(edge => {
        const date = new Date(edge.node.publishedDate)

        if (edge.node.slug !== "demo-post" && date <= today) {
          createPage({
            path: `/blog/${edge.node.slug}`,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              slug: edge.node.slug,
            },
          })
        }
      })
    }

    response.data.allContentfulGallery.edges.forEach(edge => {
      createPage({
        path: `/${edge.node.category.toLowerCase().replace(/\s+/g, "")}/${
          edge.node.slug
        }`,
        component: path.resolve("./src/templates/gallery.js"),
        context: {
          slug: edge.node.slug,
        },
      })
    })

    response.data.allContentfulClientGallery.edges.forEach(edge => {
      createPage({
        path: `/clients/${edge.node.slug}`,
        component: path.resolve("./src/templates/client-gallery.js"),
        context: {
          slug: edge.node.slug,
        },
      })
    })

    response.data.allContentfulGallery.distinct.forEach(category => {
      const formattedCategory = category.toLowerCase().replace(/\s+/g, "")

      createPage({
        path: `/${formattedCategory}`,
        component: path.resolve("./src/templates/gallery-list.js"),
        context: {
          category: category,
        },
      })
    })
  }

  /* createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  }) */
}
