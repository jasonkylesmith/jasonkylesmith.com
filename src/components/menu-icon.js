import * as React from "react"
import { useState } from "react"
import useScrollBlock from "./helpers/useScrollBlock"

const MenuIcon = props => {
  const [blockScroll, allowScroll] = useScrollBlock()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleMenuClick = () => {
    if (!menuOpen) {
      blockScroll()
      setMenuOpen(!menuOpen)
      setTimeout(() => {
        setModalOpen(!modalOpen)
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
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {menuOpen && (
        <div id="mobile-menu" className={`${modalOpen && "open"}`}></div>
      )}
    </>
  )
}

export default MenuIcon