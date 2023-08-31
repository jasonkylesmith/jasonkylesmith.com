import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Fragment } from "react"

const Navigation = props => {
  const { navSettings } = props

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
      <nav className={`d-none d-md-block desktop-nav`}>
        {navSettings?.mainLinks && (
          <ul>
            <li>
              <Link to="/" className="">
                home
              </Link>
            </li>

            {navSettings?.mainLinks &&
              navSettings.mainLinks.map(link => {
                return (
                  <Fragment key={`main-${link.slug}`}>
                    <li> - </li>
                    <li>
                      {" "}
                      <Link to={`/${link.slug}`}>{link.navLinkText}</Link>
                    </li>
                  </Fragment>
                )
              })}

            {/* <li> - </li>
          <li>
            <Link to="/contact" className="">
              contact
            </Link>
          </li> */}

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
          </ul>
        )}
      </nav>
    )
  } else if (props.version === "menu") {
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
          {navSettings?.mainLinks &&
            navSettings.mainLinks.map(link => {
              return (
                <Fragment key={`main-${link.slug}`}>
                  <li>
                    {" "}
                    <Link
                      to={`/${link.slug}`}
                      onClick={() => {
                        props.menuClick()
                      }}
                    >
                      {link.navLinkText}
                    </Link>
                  </li>
                </Fragment>
              )
            })}
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

          {navSettings?.mainLinks &&
            navSettings.mainLinks.map(link => {
              return (
                <li key={`mobile-${link.slug}`}>
                  <Link
                    to={`/${link.slug}`}
                    className=""
                    onClick={() => {
                      props.menuClick()
                    }}
                  >
                    {link.navLinkText}
                  </Link>
                </li>
              )
            })}
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
