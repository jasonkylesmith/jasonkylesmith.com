import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Tags from "../components/tags"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
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
        }
      }
    }
  `)

  const { edges } = data.allContentfulBlogPost

  const filteredEdges = edges.filter(edge => edge.node.slug !== "demo-post")
  // Filter out posts to be published in the future .filter(edge => new Date(edge.node.fullDate) <= new Date())

  const featuredPosts = filteredEdges.filter(
    edge => edge.node.featured === "yes"
  )

  const nonFeaturedPosts = filteredEdges.filter(
    edge => edge.node.featured !== "yes"
  )

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    lazyLoad: true,
    autoplaySpeed: 7500,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    cssEase: "linear",
    arrows: false,
    appendDots: dots => <ul> {dots}</ul>,
    fade: true,
  }

  return (
    <Layout>
      <Seo title="Blog" />

      {/*       <div className="row">
        <div className="col-12 mt-4 mt-md-0 d-flex flex-column">
          <div className="align-self-start">
            <h1>Blog</h1>
          </div>
        </div>
      </div> */}

      {/* <div className="row my-4">
        <div className="col-10 offset-1 mb-4">
          <Slider {...sliderSettings}>
            {featuredPosts?.map((post, index) => {
              const { title, featuredImage, excerpt, publishedDate, slug } =
                post.node

              return (
                <Link to={"/blog/{$slug}"}>
                  <div style={{ maxHeight: "400px" }}>
                    <GatsbyImage
                      image={featuredImage?.gatsbyImageData}
                      alt={title}
                      objectFit={"cover"}
                      objectPosition={"bottom"}
                      imgStyle={{}}
                      style={{ maxHeight: "400px" }}
                    />
                    <div className="row">
                      <div className="col-12 col-md-8">
                        <h4 className="text-black">{title}</h4>
                      </div>
                      <div className="col-12 col-md-4">
                        <p className="small text-md-end text-black">
                          {publishedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </Slider>
        </div>
      </div>

      {nonFeaturedPosts && (
        <div className="row mt-4">
          <div className="col-10 offset-1">
            <div className="row">
              {nonFeaturedPosts.map((post, index) => {
                return (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 offset-xl-1 mb-4"
                    style={{ border: "2px solid purple" }}
                  >
                    {post.node.featuredImage && (
                      <Link to={`/blog/${post.node.slug}`} className="">
                        <div className="">
                          <div>
                            <GatsbyImage
                              className=""
                              image={post.node.featuredImage.gatsbyImageData}
                              alt={post.node.title}
                            />
                          </div>
                          <h5 className="text-black m-0">{post.node.title}</h5>
                        </div>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )} */}

      <div className="row mt-4 px-2">
        <div className="col-12 col-lg-12">
          <div className="row">
            <div className="col-12 p-0">
              <h1>Blog Posts</h1>
            </div>
            {filteredEdges.map((post, index) => {
              return (
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mx-0">
                  {post.node.featuredImage && (
                    <Link to={`/blog/${post.node.slug}`} className="">
                      <div className="">
                        <div className="position-relative">
                          <GatsbyImage
                            className=""
                            imgStyle={{ borderRadius: ".25rem" }}
                            imgClass="gallery-image"
                            image={post.node.featuredImage.gatsbyImageData}
                            alt={post.node.title}
                          />

                          <Tags tags={post.node.tags} />
                        </div>
                        <div className="">
                          <h4 className="text-dark mt-1 mb-0">
                            {post.node.title}
                          </h4>
                          <span
                            className="text-dark small fw-normal"
                            style={{ fontSize: "14px" }}
                          >
                            {post.node.publishedDate}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* <div
        className="container-fluid px-0"
        style={{ border: "2px solid pink" }}
      >
        <div className="row">
          <div className="col-10 offset-1 mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-center">
            <div>
              {nonFeaturedPosts && (
                <div className="row" style={{ border: "2px solid pink" }}>
                  {nonFeaturedPosts.map((post, index) => {
                    return (
                      <div
                        key={`${post.node.contentful_id}${index}`}
                        style={{ border: "2px solid pink" }}
                        className="col-12"
                      >
                        {post.node.featuredImage && (
                          <div className="">
                            <div>
                              <GatsbyImage
                                className=""
                                image={post.node.featuredImage.gatsbyImageData}
                                alt={post.node.title}
                              />
                            </div>
                            <h2 className="">{post.node.title}</h2>
                            {post.node.excerpt && (
                              <p className="excerpt">
                                {post.node.excerpt.childMarkdownRemark.excerpt}
                              </p>
                            )}

                            <Link
                              to={`/blog/${post.node.slug}`}
                              className="btn"
                            >
                              Read More
                            </Link>
                          </div>
                        )}
                        {!post.node.featuredImage && (
                          <div className="post-excerpt-wrapper">
                            <h2 className="">{post.node.title}</h2>
                            {post.node.excerpt && (
                              <p className="excerpt">
                                {post.node.excerpt.childMarkdownRemark.excerpt}
                              </p>
                            )}

                            <Link
                              to={`/blog/${post.node.slug}`}
                              className="btn"
                            >
                              Read More
                            </Link>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  )
}

export default Blog
