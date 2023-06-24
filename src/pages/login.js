import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
import LivePlaceholder from "../components/live-placeholder"

const Login = () => {
  const { loginWithRedirect, logout } = useAuth0()

  return process.env.GATSBY_ENVIRONMENT === "live" ? (
    <LivePlaceholder />
  ) : (
    <>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}

export default Login
