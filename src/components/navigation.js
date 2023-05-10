import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

const Navigation = props => {
  /*   const data = useStaticQuery(graphql`
    query {
      allContentfulGallery {
        distinct(field: category)
      }
    }
  `)

  const { distinct } = data.allContentfulGallery */

  if (props.version === "desktop") {
    return (
      <nav className="d-none d-md-block desktop-nav">
        <ul>
          <li>
            <Link to="/" className="">
              home
            </Link>
          </li>
          <li> - </li>
          <li>
            <Link to="/about" className="">
              about
            </Link>
          </li>

          <li> - </li>
          <li>
            <Link to="/lifestyle" className="">
              lifestyle
            </Link>
          </li>

          <li> - </li>
          <li>
            <Link to="/studio" className="">
              studio
            </Link>
          </li>

          <li> - </li>
          <li>
            <Link to="/photostories" className="">
              photo stories
            </Link>
          </li>

          <li> - </li>
          <li>
            <Link to="/contact" className="">
              contact
            </Link>
          </li>

          <li> - </li>
          {/*           {distinct?.map((category, index) => {
            return (
              <div
                key={`${category}${index}-desktop`}
                style={{ display: "inline" }}
              >
                <li>
                  <Link to={`/${category.toLowerCase().replace(/\s+/g, "")}`}>
                    {category.toLowerCase()}
                  </Link>
                </li>
                <li> - </li>
              </div>
            )
          })} */}
          <li>
            <Link to="/blog" className="">
              blog
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="mobile-nav">
        <ul>
          <li>
            <Link
              to="/"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              about
            </Link>
          </li>
          <li>
            <Link
              to="/lifestyle"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              lifestyle
            </Link>
          </li>
          <li>
            <Link
              to="/studio"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              studio
            </Link>
          </li>
          <li>
            <Link
              to="/photostories"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              photo stories
            </Link>
          </li>
          {/*           {distinct?.map((category, index) => {
            return (
              <li key={`${category}${index}-mobile`}>
                <Link
                  to={`/${category.toLowerCase().replace(/\s+/g, "")}`}
                  onClick={() => {
                    props.menuClick()
                  }}
                >
                  {category.toLowerCase()}
                </Link>
              </li>
            )
          })} */}
          <li>
            <Link
              to="/contact"
              onClick={() => {
                props.menuClick()
              }}
            >
              contact
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className=""
              onClick={() => {
                props.menuClick()
              }}
            >
              blog
            </Link>
          </li>
          {/*           <li>
            <Link
              to="/clients"
              onClick={() => {
                props.menuClick()
              }}
            >
              clients
            </Link>
          </li> */}
        </ul>
      </nav>
    )
  }
}

export default Navigation
