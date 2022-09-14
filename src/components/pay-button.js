import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { graphql, useStaticQuery } from "gatsby"

library.add(fas)

const PayButton = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSitewideCopy(filter: { name: { eq: "Basic" } }) {
        edges {
          node {
            paymentTitle
            paymentButton
          }
        }
      }
    }
  `)

  const { paymentTitle, paymentButton } =
    data.allContentfulSitewideCopy.edges[0].node

  function showCheckoutWindow(e) {
    e.preventDefault()

    const url = "https://square.link/u/jWBkMz4V?src=embed"
    const title = "Square Online Checkout"

    // Some platforms embed in an iframe, so we want to top window to calculate sizes correctly
    const topWindow = window.top ? window.top : window

    // Fixes dual-screen position                                Most browsers          Firefox
    const dualScreenLeft =
      topWindow.screenLeft !== undefined
        ? topWindow.screenLeft
        : topWindow.screenX
    const dualScreenTop =
      topWindow.screenTop !== undefined
        ? topWindow.screenTop
        : topWindow.screenY

    const width = topWindow.innerWidth
      ? topWindow.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width
    const height = topWindow.innerHeight
      ? topWindow.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height

    const h = height * 0.75
    const w = 500

    const systemZoom = width / topWindow.screen.availWidth
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(
      url,
      title,
      `scrollbars=yes, width=${w / systemZoom}, height=${
        h / systemZoom
      }, top=${top}, left=${left}`
    )

    if (window.focus) newWindow.focus()
  }

  return (
    <div>
      <div>
        <div
          style={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "226px",
            background: "#FFFFFF",
            border: "2px solid rgba(31, 31, 31, .1)",
            boxShadow: "-2px 10px 5px rgba(0, 0, 0, 0)",
            borderRadius: ".25rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                lineHeight: "20px",
              }}
            >
              {paymentTitle ?? "Have an invoice to pay?"}
            </p>

            <button
              target="_blank"
              data-url="https://square.link/u/jWBkMz4V?src=embd"
              href="https://square.link/u/jWBkMz4V?src=embed"
              className="btn button mb-0"
              onClick={showCheckoutWindow}
            >
              <div>
                <span>{paymentButton ?? "Pay Now"}</span>
                <FontAwesomeIcon
                  icon={["fas", "up-right-from-square"]}
                  className="mx-1"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayButton
