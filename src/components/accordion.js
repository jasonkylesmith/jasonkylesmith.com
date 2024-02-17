import React, { useState } from "react"
import {
  Accordion as AccordionComponent,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion"
import MarkdownDisplay from "./markdown-display"
import YouTubeEmbed from "./youtube-embed"

const Accordion = ({ module }) => {
  const { items, allowMultipleExpanded, allowZeroExpanded, preExpanded } =
    module

  const AccordionItemContainer = ({ data }) => {
    const { heading, body, contentful_id, video } = data

    return (
      <AccordionItem uuid={`${contentful_id}`}>
        <AccordionItemHeading>
          <AccordionItemButton>
            <MarkdownDisplay
              props={heading.childrenMarkdownRemark[0]}
              noButton={true}
            />
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <MarkdownDisplay
              props={body.childrenMarkdownRemark[0]}
              noButton={true}
            />
            {video && <YouTubeEmbed module={video} />}
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    )
  }

  return (
    <div className={``}>
      <AccordionComponent
        allowZeroExpanded={allowZeroExpanded}
        allowMultipleExpanded={allowMultipleExpanded}
        preExpanded={preExpanded ? preExpanded : []}
      >
        {items.map(item => {
          return <AccordionItemContainer data={item} key={item.contentful_id} />
        })}
      </AccordionComponent>
    </div>
  )
}

export default Accordion
