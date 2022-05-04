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
      allContentfulProject {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulGallery {
        edges {
          node {
            slug
            category
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

  response.data.allContentfulProject.edges.forEach(edge => {
    createPage({
      path: `/projects/${edge.node.slug}`,
      component: path.resolve("./src/templates/project.js"),
      context: {
        slug: edge.node.slug,
      },
    })
  })

  response.data.allContentfulGallery.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.category}/${edge.node.slug}`,
      component: path.resolve("./src/templates/gallery.js"),
      context: {
        slug: edge.node.slug,
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
