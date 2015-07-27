import React from 'react'
import MobilizationMenu from './../components/MobilizationMenu.jsx'
import * as MobilizationActions from './../actions/MobilizationActions'
import { connect } from 'redux/react'
import { bindActionCreators } from 'redux'

@connect(state => ({
  mobilizations: state.mobilizations
}))

export default class Mobilization extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props
    const actions = bindActionCreators(MobilizationActions, dispatch)
    actions.fetchMobilizations()
  }

  render(){
    const ids = this.props.mobilizations.map((mobilization) => {return mobilization.id.toString()})
    const mobilization = this.props.mobilizations[ids.indexOf(this.props.params.mobilization_id)]
    return(mobilization ? this.renderMobilization(mobilization) : this.renderLoader())
  }

  renderMobilization(mobilization){
    return(
      <div className="flex flex-stretch">
        <MobilizationMenu {...this.props} mobilization={mobilization} />
        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props, mobilization: mobilization})}
      </div>
    )
  }

  renderLoader(){
    return(<div>Carregando...</div>)
  }
}