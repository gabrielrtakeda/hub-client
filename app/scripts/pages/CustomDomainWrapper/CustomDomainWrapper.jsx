import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { findBlocks, isBlocksLoaded } from './../../reducers/blocks'
import { findWidgets, isWidgetsLoaded } from './../../Widget/reducer'
import { ShowMobilization } from './../'
import { fetchMobilizations, mobilizationsIsLoaded } from '../../Mobilization/MobilizationActions'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'

export class CustomDomainWrapper extends React.Component {
  static fetchData(store, params, query, host) {
    const regex = host.match(`(.+)\.${process.env.APP_DOMAIN}`)
    let findParams

    if (regex) {
      findParams = { slug: regex[1].replace(/^www\./, '') }
    } else {
      findParams = { custom_domain: host }
    }

    const promises = []

    if (!mobilizationsIsLoaded(store.getState())) {
      const action = fetchMobilizations(findParams)
      const dispatch = store.dispatch(action)
      promises.push(dispatch)
    }

    if (!isBlocksLoaded(store.getState())) {
      const action = findBlocks(findParams)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    if (!isWidgetsLoaded(store.getState())) {
      const action = findWidgets(findParams)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    return Promise.all(promises)
  }

  renderMobilization() {
    const { mobilizations, blocks, widgets } = this.props
    const { header_font: headerFont, body_font: bodyFont } = mobilizations[0]
    const fonts = [headerFont, bodyFont].filter(arrayUtil.distinct)

    return (
      <div>
        <ShowMobilization
          mobilization={mobilizations[0]}
          blocks={blocks}
          widgets={widgets}
          {...this.props}
        />
        <GoogleFontsLoader fonts={fonts} />
      </div>
    )
  }

  renderMobilizationNotFound() {
    return (
      <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-center bg-atomic'>
        <div className='center flex-auto white'>
          <div className='h1'>
            Ops! Estamos com um problema técnico. Em caso de dúvida, escreva
            para <a href="mailto:contato@nossascidades.org">contato@nossascidades.org</a>.
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      this.props.mobilizations.length === 0
       ? this.renderMobilizationNotFound()
       : this.renderMobilization()
    )
  }
}

CustomDomainWrapper.propTypes = {
  mobilizations: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  blocks: PropTypes.object.isRequired,
  widgets: PropTypes.object.isRequired,
  params: PropTypes.object
}

const mapStateToProps = state => ({
  mobilizations: state.mobilization.data,
  blocks: state.blocks,
  widgets: state.widgets
})

export default connect(mapStateToProps)(CustomDomainWrapper)
