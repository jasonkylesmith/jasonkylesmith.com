import React from "react"
import { months } from "../helpers/constants"

const AvailabilityList = ({ module }) => {
  console.log(module)

  return (
    <div className="availabilityList">
      {months.map(month => {
        return (
          <div className="availabilityItem">
            <div>
              <span className="month">{month}</span>{" "}
              <span className={module[month] ? "closed" : "open"}>
                {module[month] ? "CLOSED" : "OPEN"}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AvailabilityList
