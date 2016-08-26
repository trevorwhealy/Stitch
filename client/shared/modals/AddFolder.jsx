import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';

class AddFolder extends React.Component {

  constructor() {
    super();
    this.onInputRender = this.onInputRender.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.addFolder = this.addFolder.bind(this);
  }

  onInputRender(inputEl) {
    this.inputEl = inputEl;
  }

  onCreateClick() {
    if (!this.inputEl || !this.inputEl.value) { return; }
    const folderName = this.inputEl.value;
    this.props.folderActions.createFolder(folderName);
    this.inputEl.value = '';
    $('#addFolderModal').closeModal();
  }

  addFolder(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        this.props.folderActions.createFolder(e.target.value);
        e.target.value = '';
        $('#addFolderModal').closeModal();
      }
    }
  }

  closeModal() {
    $('#addFolderModal').closeModal();
  }

  render() {
    if (this.inputEl) {
      setTimeout(() => this.inputEl.focus(), 500);
    }

    return (
      <div id="addFolderModal" className="modal">
        <div className="modal-content">
          <h5>Create a new folder</h5>
          <input
            type="text" placeholder="Enter folder name"
            onKeyDown={this.addFolder} ref={this.onInputRender}
          />
        </div>
        <div className="modalActions">
          <button onClick={this.closeModal} className="waves-effect btn-flat cancelBtn">
            CANCEL
          </button>
          <button
            onClick={this.onCreateClick}
            className="waves-effect btn-flat actionBtn"
          >
            CREATE
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(AddFolder);

AddFolder.propTypes = {
  folderActions: React.PropTypes.object,
};
