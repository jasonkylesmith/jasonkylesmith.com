import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

const LogoutButton = ({ children }) => {
  const { logout } = useAuth0()

  return (
    <button className="button" onClick={() => logout()}>
      {children}
    </button>
  )
}

export default LogoutButton
