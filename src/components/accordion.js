import React, { useState } from "react"
import {
  Accordion as AccordionComponent,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion"
import MarkdownDisplay from "./markdown-display"

const Accordion = ({ module }) => {
  const { items, allowMultipleExpanded, allowZeroExpanded, preExpanded } =
    module

  const data = [
    {
      question: "Do you do weddings or events?",
      answer:
        "Though I feel that is something I could do creatively, my focus is much more on portraiture. Events are very grand and important; the photographer you choose to capture your wedding, 50th birthday, or Quinceañera should really be focused on making that their expertise. I would however, be happy to provide consultation in picking your wedding photographer should you need the help!",
    },
    {
      question: "How come you don't have a dedicated studio?",
      answer:
        "I really like the idea of being mobile with my photography. I want to be able to capture what you need in almost any place, whether that be your home, your office, the park, or some local parking lot. I want to photograph you where you want to be. I can always convert my living room into a make-shift studio or rent a space if needed for a specific project with those types of demands.",
    },
  ]

  const AccordionItemContainer = ({ data }) => {
    const { heading, body, contentful_id } = data

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
          <MarkdownDisplay
            props={body.childrenMarkdownRemark[0]}
            noButton={true}
          />
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
        /* preExpanded={["0", "1"]} */
      >
        {items.map((item, index) => {
          return <AccordionItemContainer data={item} key={item.contentful_id} />
        })}
      </AccordionComponent>
    </div>
  )
}

export default Accordion
