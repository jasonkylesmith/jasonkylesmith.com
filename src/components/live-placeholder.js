import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Seo from "./seo"
import { Link } from "gatsby"

const LivePlaceholder = () => {
  return (
    <>
      <Seo title="Coming Soon" />

      <div className="layout-container">
        <div
          className="hero-text w-100 position-absolute m-0 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "99vh" }}
        >
          <h1>Jason Kyle Smith</h1>
          <p>Coming Soon</p>
          <div className="position-absolute" style={{ bottom: "1rem" }}>
            <a
              href="https://www.twitter.com/jasonkylesmith"
              target="_new"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                className="mx-1 icon"
                viewBox="0 0 448 1"
              />
            </a>
            <a
              href="https://www.instagram.com/jasonkylesmithphoto"
              target="_new"
              className="icon"
            >
              <FontAwesomeIcon
                icon={["fab", "instagram"]}
                className="mx-1 icon"
                viewBox="0 0 448 1"
              />
            </a>

            {/*             <a
            rel="me"
            href="https://universeodon.com/@jasonkylesmith"
            target="_new"
            className="icon"
          >
            <FontAwesomeIcon
              icon={["fab", "mastodon"]}
              className="mx-1 icon"
              viewBox="0 0 448 1"
            />
          </a> */}
          </div>
        </div>
        {/* SIDEBAR WRAPPER*/}

        <div className="sidebar d-none d-md-block">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="position-fixed d-none d-md-flex flex-column justify-content-between vh-100">
                  {/* <Header version="desktop" /> */}

                  {/* <Navigation version="desktop" /> */}

                  {/* <Footer version="desktop" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT WRAPPER*/}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="d-flex d-md-none mobile-header sticky-top align-items-center">
              <Header version="mobile" />
            </div> */}
              <div className="col">{/* <main>{children}</main> */}</div>

              {/* <div className="">
              <Footer version="mobile" />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LivePlaceholder
