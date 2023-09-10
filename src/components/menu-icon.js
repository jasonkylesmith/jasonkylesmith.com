import * as React from "react"
import { useState } from "react"
import Footer from "./footer"
import useScrollBlock from "./helpers/useScrollBlock"
import Navigation from "./navigation"
import { Link } from "gatsby"

const MenuIcon = props => {
  const [blockScroll, allowScroll] = useScrollBlock()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleMenuClick = () => {
    if (!menuOpen) {
      setMenuOpen(!menuOpen)
      setTimeout(() => {
        setModalOpen(!modalOpen)
        setTimeout(() => {
          blockScroll()
        }, 200)
      }, 50)
    } else {
      allowScroll()
      setModalOpen(!modalOpen)
      setTimeout(() => {
        setMenuOpen(!menuOpen)
      }, 100)
    }
  }

  const { navSettings } = props

  return (
    <>
      <div
        onClick={() => {
          handleMenuClick()
        }}
        role="button"
        style={{
          display: "flex",
          gap: ".25rem",
          background:
            props.version === "desktop"
              ? props.navColor === "light"
                ? "#1f1f1f"
                : "#f7f7f7"
              : "transparent",
          padding: props.version === "desktop" ? ".6rem .9rem" : 0,
          borderRadius: ".25rem",
        }}
      >
        <span
          className="d-none d-md-inline"
          style={{
            textTransform: "uppercase",
            fontWeight: 900,
            color: props.navColor === "light" ? "#f7f7f7" : "#1f1f1f",
          }}
        >
          Menu
        </span>
        <div id="menu-icon" className={`${menuOpen && "open"}`}>
          <span
            style={{
              background: props.navColor === "light" ? "#f7f7f7" : "#1f1f1f",
            }}
          ></span>
          <span
            style={{
              background: props.navColor === "light" ? "#f7f7f7" : "#1f1f1f",
            }}
          ></span>
          <span
            style={{
              background: props.navColor === "light" ? "#f7f7f7" : "#1f1f1f",
            }}
          ></span>
          <span
            style={{
              background: props.navColor === "light" ? "#f7f7f7" : "#1f1f1f",
            }}
          ></span>
        </div>
      </div>
      {menuOpen && (
        <div
          id="mobile-menu"
          className={`${
            modalOpen && "open"
          } d-flex flex-column justify-content-center`}
        >
          {props.version === "desktop" ? (
            <>
              <Navigation
                version="menu"
                menuClick={handleMenuClick}
                navSettings={navSettings}
              />

              <Footer version="menu" />
            </>
          ) : (
            <>
              <div
                style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
              >
                <Link className="btn cta" to="/contact?destination=mobile-menu">
                  Let's Chat
                </Link>
              </div>
              <Navigation
                menuClick={handleMenuClick}
                navSettings={navSettings}
              />

              <Footer />
            </>
          )}
        </div>
      )}
    </>
  )
}

export default MenuIcon
