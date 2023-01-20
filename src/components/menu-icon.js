import * as React from "react"
import { useState } from "react"
import Footer from "./footer"
import useScrollBlock from "./helpers/useScrollBlock"
import Navigation from "./navigation"

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

  return (
    <>
      <div
        id="menu-icon"
        className={`${menuOpen && "open"}`}
        onClick={() => {
          handleMenuClick()
        }}
        role="button"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {menuOpen && (
        <div
          id="mobile-menu"
          className={`${
            modalOpen && "open"
          } d-flex flex-column justify-content-center`}
        >
          <Navigation version="menu" menuClick={handleMenuClick} />
          <Footer version="menu" />
        </div>
      )}
    </>
  )
}

export default MenuIcon
