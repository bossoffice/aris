import React from "react"
import "./index.css"
const Button = props => (
  <div className="next_button">
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button>
  </div>
)

export default Button
