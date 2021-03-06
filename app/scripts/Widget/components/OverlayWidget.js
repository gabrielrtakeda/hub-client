import React, { Component, PropTypes } from 'react'

import './scss/overlay.scss'

class OverlayWidget extends Component {
  constructor(props, context) {
    super(props)
    this.context = context
    this.state = { hasMouseOver: false }
  }

  handleMouseEnter(e) {
    if (e) e.preventDefault()
    this.setState({ hasMouseOver: true })
  }

  handleMouseLeave(e) {
    if (e) e.preventDefault()
    this.setState({ hasMouseOver: false })
  }

  render() {
    const { children, editable, onClick, text } = this.props
    return (
      <div className="relative"
        style={editable ? { cursor: 'pointer' } : null}
        onMouseEnter={::this.handleMouseEnter}
        onMouseLeave={::this.handleMouseLeave}
        onClick={onClick}
      >
        {children}
        {
          !editable || !this.state.hasMouseOver ? null : (
            <div className="overlay h1 rounded z1 border border-pagenta px2">
              <div className="table full-height col-12 center">
                <div className="white table-cell align-middle">
                  {text || 'Clique para editar'}
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

OverlayWidget.propTypes = {
  editable: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string
}

OverlayWidget.defaultProps = {
  editable: false,
}

export default OverlayWidget
