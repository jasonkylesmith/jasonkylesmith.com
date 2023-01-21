import React from "react"
import Slider from "react-slick"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Testimonial from "./testimonial"

library.add(fas)

const Carousel = ({ module }) => {
  const { slides } = module

  const SliderNextArrow = props => {
    const { className, onClick } = props
    return (
      <FontAwesomeIcon
        icon={["fas", "angle-right"]}
        className={`${className} highlight__icon--right`}
        onClick={onClick}
      />
    )
  }

  const SliderPrevArrow = props => {
    const { className, onClick } = props
    return (
      <FontAwesomeIcon
        icon={["fas", "angle-left"]}
        className={`${className} highlight__icon--left`}
        onClick={onClick}
      />
    )
  }

  const highlightSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    lazyLoad: false,

    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "",
    easing: "ease-in-out",
    arrows: true,
    fade: false,
    swipe: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 550, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }

  return (
    <Slider {...highlightSettings}>
      {slides.map((slide, index) => {
        return (
          <div className="row mx-1 pe-2" key={`${slide.id}-${index}`}>
            <div className="col-12 d-flex justify-content-center mb-4 px-2 px-md-0">
              <Testimonial
                {...slide}
                variant={index % 2 === 1 ? "left" : "right"}
              />
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default Carousel
