import React, { useState } from "react"

const FAQ = ({ module }) => {
  const data = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be in their original condition and packaging to be eligible for a refund.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and viewing your order history, or by using the tracking number provided in your shipping confirmation email.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to select countries. Additional fees and taxes may apply.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team by email, phone, or through our website's contact form.",
    },
    {
      question: "What are your business hours?",
      answer:
        "Our business hours are Monday to Friday from 9:00am to 5:00pm EST.",
    },
    {
      question: "Do you have a warranty on your products?",
      answer:
        "Yes, we offer a 1-year limited warranty on all of our products, covering defects in materials and workmanship.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(-1)

  const handleFAQToggle = index => {
    const faqDiv = document.getElementById(`faq-${index}`)
    const allFaqDivs = document.getElementsByClassName("faq__wrapper")

    faqDiv.classList.toggle("faq__wrapper--active")

    console.log("all faq divs", allFaqDivs)
    for (let i = 0; i < allFaqDivs.length; i++) {
      if (i !== index) {
        allFaqDivs[i].classList.remove("faq__wrapper--active")
      }
    }

    if (activeIndex === index) {
      setActiveIndex(-1)
    } else {
      setActiveIndex(index)
    }
  }

  const FAQBox = ({ faq, index }) => {
    const { question, answer } = faq

    console.log(activeIndex, index)

    return (
      <div
        className={`faq__wrapper`}
        onClick={() => handleFAQToggle(index)}
        id={`faq-${index}`}
      >
        {activeIndex !== index && (
          <p className={`faq__wrapper--heading active`}>{question}</p>
        )}
        {activeIndex === index && (
          <p className="faq__wrapper--body active">{answer}</p>
        )}
      </div>
    )
  }

  return (
    <div className={`faq__container`}>
      {data.map((faq, index) => {
        return <FAQBox faq={faq} index={index} />
      })}
    </div>
  )
}

export default FAQ
