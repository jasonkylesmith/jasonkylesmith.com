import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import PayButton from "./pay-button"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"

library.add(fab)
library.add(fas)

const SocialIcons = props => {
  const data = useStaticQuery(graphql`
    query {
      contentfulAuthor(name: { eq: "Jason Kyle Smith" }) {
        contentful_id
        sys {
          type
          contentType {
            sys {
              id
            }
          }
        }
        linkedIn
        twitter
        gitHub
        instagram
        mastodon
      }
    }
  `)

  const { linkedIn, twitter, gitHub, instagram, mastodon } =
    data.contentfulAuthor

  const [payVisibleDesktop, setPayVisibleDesktop] = useState(false)
  const [payVisibleMobile, setPayVisibleMobile] = useState(false)

  const togglePayVisibleDesktop = () => {
    setPayVisibleDesktop(!payVisibleDesktop)
  }

  const togglePayVisibleMobile = () => {
    setPayVisibleMobile(!payVisibleMobile)
  }

  const refDesktop = useRef(null)
  const refMobile = useRef(null)
  const refButton = useRef(null)

  const handleClickOutside = event => {
    if (
      event.type === "click" &&
      refButton &&
      !refButton?.current?.contains(event.target)
    ) {
      if (
        event.type === "click" &&
        refDesktop.current &&
        !refDesktop.current.contains(event.target)
      ) {
        setPayVisibleDesktop(false)
      }

      if (
        event.type === "click" &&
        refMobile.current &&
        !refMobile.current.contains(event.target)
      ) {
        setPayVisibleMobile(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <a href={twitter} target="_new" className="icon">
        <FontAwesomeIcon
          icon={["fab", "twitter-square"]}
          className="mx-1 icon"
        />
      </a>
      <a href={instagram} target="_new" className="icon">
        <FontAwesomeIcon
          icon={["fab", "instagram-square"]}
          className="mx-1 icon"
        />
      </a>
      <a rel="me" href={mastodon} target="_new" className="icon">
        <FontAwesomeIcon icon={["fab", "mastodon"]} className="mx-1 icon" />
      </a>
      {props?.version !== "author" && (
        <button
          onClick={() => {
            togglePayVisibleDesktop()
            togglePayVisibleMobile()
          }}
          ref={refButton}
          className="icon"
          style={{ borderWidth: 0 }}
        >
          <FontAwesomeIcon
            icon={["fas", "dollar-sign"]}
            className={`mx-1 icon ${
              props.version !== "desktop" ? "mobile" : ""
            }`}
          />
        </button>
      )}
      {props?.version === "desktop" && payVisibleDesktop && (
        <div
          style={{ position: "absolute", right: 0, zIndex: 10 }}
          ref={refDesktop}
        >
          <PayButton />
        </div>
      )}
      {props?.version !== "desktop" && payVisibleMobile && (
        <div
          style={{ position: "absolute", bottom: 30, left: -80, zIndex: 10 }}
          ref={refMobile}
        >
          <PayButton />
        </div>
      )}
    </div>
  )
}

export default SocialIcons
