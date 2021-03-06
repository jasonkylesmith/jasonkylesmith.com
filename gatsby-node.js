const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const response = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
            publishedDate
          }
        }
      }
      allContentfulGallery {
        distinct(field: category)
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

  response.data.allContentfulBlogPost.edges
    // Filter out posts to be published in the future .filter(edge => new Date(edge.node.publishedDate) <= new Date())
    .forEach(edge => {
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
      path: `/client/${edge.node.slug}`,
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

  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
