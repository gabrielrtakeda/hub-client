import React from 'react'
import ColorSchemer from './Editor/ColorSchemer.jsx'

export default class WYSIHTMLToolbarColorPicker extends React.Component {
  constructor() {
    super()
    this.state = { color: "#000000" }
  }
  handleChange(color) {
    this.setState({ color: color })
  }

  render(){
    return(
      <div data-wysihtml5-dialog="foreColorStyle"
        style={{display: "none"}}
        className="white p2">
        <input
          type="text"
          data-wysihtml5-dialog-field="color"
          value={ this.state.color }
          onChange={ ::this.handleChange }
          className="hide" />
        <a ref="saveButton" data-wysihtml5-dialog-action="save" className="hide button button-outline mb1">
          Inserir</a>
        <ColorSchemer
          position="bottom"
          onChange={ ::this.handleChange }
        />
      </div>
    )
  }
}
