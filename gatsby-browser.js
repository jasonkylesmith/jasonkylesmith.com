/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "bootstrap/dist/css/bootstrap.min.css"
import "@fontsource/bebas-neue"
import "@fontsource/dosis/200.css"
import "@fontsource/dosis/300.css"
import "@fontsource/dosis/400.css"
import "@fontsource/dosis/500.css"
import "@fontsource/dosis/600.css"
import "@fontsource/dosis/700.css"
import "@fontsource/dosis/800.css"
import React from "react"
import { navigate } from "gatsby"
import { Auth0Provider } from "@auth0/auth0-react"

const onRedirectCallback = appState => {
  navigate(appState?.returnTo || "/", { replace: true })
}

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
      redirectUri={process.env.GATSBY_AUTH0_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  )
}
