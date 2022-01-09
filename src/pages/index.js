import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>This is an H1</h1>
    <h2>This is an H2</h2>
    <h3>This is an H3</h3>
    <h4>This is an H4</h4>
    <h5>This is an H5</h5>
    <h6>This is an H6</h6>
    <p>
      This is a paragraph with standard font sizing. Lorem, ipsum dolor sit amet
      consectetur adipisicing elit. Molestias aut, repellat ipsum facere
      voluptate dicta obcaecati deserunt nobis suscipit eaque? Lorem, ipsum
      dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum
      facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
    </p>
    <p className="small-text">
      This is a paragraph with smaller font sizing. Lorem, ipsum dolor sit amet
      consectetur adipisicing elit. Molestias aut, repellat ipsum facere
      voluptate dicta obcaecati deserunt nobis suscipit eaque? Lorem, ipsum
      dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum
      facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
    </p>

    <p>
      <a href="#" target="_new">
        Normal Link in Normal Paragraph
      </a>
    </p>

    <p className="small-text">
      <a href="#" target="_new">
        Normal Link in Small Text Paragraph
      </a>
    </p>

    <a href="#" target="_new" className="btn">
      Button Link
    </a>

    <blockquote>This is a blockquote.</blockquote>

    <ul>
      <lh>Unordered List Header</lh>
      <li>Unordered List Item</li>
    </ul>

    <ol>
      <lh>Ordered List Header</lh>
      <li>Ordered List Item</li>
    </ol>

    <table>
      <tr>
        <th>Table Header 1</th>
        <th>Table Header 2</th>
      </tr>
      <tr>
        <td>Table Data 1</td>
        <td>Table Data 2</td>
      </tr>
    </table>
    <p>
      <Link to="/blog/">Go to Blog</Link> <br />
    </p>
  </Layout>
)

export default IndexPage
