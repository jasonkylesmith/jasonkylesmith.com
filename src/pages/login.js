import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

const Login = () => {
  const { loginWithRedirect, logout } = useAuth0()

  return (
    <>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}

export default Login
