import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../../actions/FolderActions.jsx';


class RenameFolder extends React.Component {

  renameNote() {
    const newTitle = $('#renameFolderInput').val();
    if (newTitle.length) {
      this.props.folderActions.renameFolder(this.props.folder.id, newTitle);
      this.closeModal();
      $('#renameFolderInput').val('');
    }
  }

  closeModal() {
    $('#renameFolderModal').closeModal();
  }

  keyTracking(e) {
    if (e.keyCode === 13) {
      this.renameNote();
    }
  }

  render() {
    return (
      <div id="renameFolderModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> Are you sure you want to <b>rename</b> folder: </h5>
            <h5><b>{this.props.folder.name}</b></h5>
            <input id="renameFolderInput" style={{ textAlign: "center", fontSize: "1.7em", padding: '5px' }} type="text" onKeyDown={this.keyTracking.bind(this)} />
          </div>
        </center>
        <div className="cancelDelete">
          <button onClick={this.closeModal} className="waves-effect waves-gray btn-flat cancel">
            CANCEL
          </button>
          <button onClick={this.renameNote.bind(this)} className="waves-effect waves-orange btn-flat delete">
            UPDATE
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
)(RenameFolder);

RenameFolder.propTypes = {
  folder: React.PropTypes.object,
  folderActions: React.PropTypes.object,
};
