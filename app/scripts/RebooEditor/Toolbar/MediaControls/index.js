import React, { Component, PropTypes } from 'react'

import { Entity, AtomicBlockUtils } from 'draft-js'
import Media from './Media'

import InsertImageButton from './InsertImageButton'


export default class MediaControls extends Component {

  handleInsertMedia(mediaType, source) {
    const { editorState, setEditorState } = this.props

    const entityKey = Entity.create(mediaType, 'IMMUTABLE', { src: source })
    const editorStateWithMedia = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
    setEditorState(editorStateWithMedia)
  }

  render() {

    const { buttonClassName, popoverClassName } = this.props

    return (
      <div className="mediaControls">
        <InsertImageButton
          buttonClassName={buttonClassName}
          popoverClassName={popoverClassName}
          handleUploadFinish={source => this.handleInsertMedia('image', source)}
        />
      </div>
    )
  }
}

MediaControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string
}


export const blockRendererFn = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    }
  }
}
