import React from "react"
import "./index.css"
const HeaderWithLabel = props => (
  <div className="form_header">
    <p className="text_header">{props.headerText}</p>
    {props.labelText && <p className="text_label">{props.labelText}</p>}
  </div>
)

export default HeaderWithLabel
