import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

const LoginButton = ({ children }) => {
  const { loginWithPopup } = useAuth0()

  return (
    <button className="button" onClick={() => loginWithPopup()}>
      {children}
    </button>
  )
}

export default LoginButton
