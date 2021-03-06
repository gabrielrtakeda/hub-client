import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'

export default class WYSIHTMLToolbarInsertImage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      image: null,
      isLoading: false
    }
  }

  handleUploadProgress(){
    this.setState({ isLoading: true })
  }

  handleUploadError(){
    this.setState({ isLoading: false })
  }

  handleUploadFinish(e){
    this.setState({
      image: e.signedUrl.substring(0, e.signedUrl.indexOf('?')),
      isLoading: false
    })
  }

  render() {
    return (
      <div
        data-wysihtml5-dialog="insertImage"
        style={{ display: 'none' }}
        className="white p2 bg-darken-3"
      >
        <div>
          <ReactS3Uploader
            className="input col-11 inline-block"
            signingUrl={`${process.env.API_URL}/uploads`}
            accept="image/*"
            onProgress={::this.handleUploadProgress}
            onError={::this.handleUploadError}
            onFinish={::this.handleUploadFinish}
          />
          <div
            className="col-1 center"
            style={{ display: this.state.isLoading ? 'inline-block' : 'none' }}
          >
            <i className="fa fa-refresh fa-spin fa-w white" />
          </div>
        </div>

        <input data-wysihtml5-dialog-field="src" value={this.state.image} type="hidden" />
        <label>
          <span className="mr1">Alinhamento</span>
          <select
            data-wysihtml5-dialog-field="className"
            className="select inline-block col-2 mr2 mb0"
          >
            <option value=""></option>
            <option value="left">Esquerda</option>
            <option value="right">Direita</option>
          </select>
        </label>
        <a data-wysihtml5-dialog-action="save" className="btn btn-outline white mr1">Inserir</a>
        <a data-wysihtml5-dialog-action="cancel" className="btn btn-transparent white">Cancelar</a>
      </div>
    )
  }
}
