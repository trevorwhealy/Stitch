import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../../actions/FolderActions.jsx';


class DeleteFolder extends React.Component {

  deleteFolder() {
    this.props.folderActions.deleteFolder(this.props.folder.id);
    $('#deleteFolderModal').closeModal();
  }

  closeDeleteModal() {
    $('#deleteFolderModal').closeModal();
  }

  render() {
    return (
      <div id="deleteFolderModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> Are you sure you want to delete folder: </h5>
            <h5><b>{this.props.folder.name}</b></h5>
          </div>
        </center>
          <div className="cancelDelete">
            <button onClick={this.closeDeleteModal} className="waves-effect waves-gray btn-flat cancel">
              CANCEL
            </button>
            <button onClick={this.deleteFolder.bind(this)} className="waves-effect waves-red btn-flat delete">
              DELETE
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
)(DeleteFolder);

DeleteFolder.propTypes = {
  folder: React.PropTypes.object,
  folderActions: React.PropTypes.object,
};
