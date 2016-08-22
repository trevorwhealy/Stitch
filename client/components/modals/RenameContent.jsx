import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../../actions/FolderActions.jsx';
import * as noteActionCreators from '../../actions/NoteActions.jsx';

class RenameContent extends React.Component {
  constructor() {
    super();

    this.keyTracking = this.keyTracking.bind(this);
    this.renameContent = this.renameContent.bind(this);
  }

  renameContent() {
    const newName = $('#renameContentInput').val();
    if (newName.length) {
      if (this.props.type === 'folder') {
        this.props.folderActions.renameFolder(this.props.content.id, newName);
      } else if (this.props.type === 'note') {
        this.props.noteActions.renameNote(this.props.content.id, newName);
        if (this.props.content.folderId) {
          this.props.noteActions.getNotesInFolder(this.props.content.folderId);
        }
        this.props.noteActions.getOneNote(this.props.content.id);
      }

      this.closeModal();
      $('#renameContentInput').val('');
    }
  }

  closeModal() {
    $('#renameContentModal').closeModal();
  }

  keyTracking(e) {
    if (e.keyCode === 13) {
      this.renameContent();
    }
  }

  render() {
    return (
      <div id="renameContentModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> Are you sure you want to <b>rename</b> {this.props.content.type}: </h5>
            <h5><b>{this.props.content.name}</b></h5>
            <input
              id="renameContentInput"
              style={{ textAlign: 'center', fontSize: '1.7em', padding: '5px' }}
              type="text"
              onKeyDown={this.keyTracking}
            />
          </div>
        </center>
        <div className="cancelDelete">
          <button onClick={this.closeModal} className="waves-effect waves-gray btn-flat cancel">
            CANCEL
          </button>
          <button
            onClick={this.renameContent}
            className="waves-effect waves-orange btn-flat delete"
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(RenameContent);

RenameContent.propTypes = {
  type: React.PropTypes.string,
  content: React.PropTypes.object,
  folderActions: React.PropTypes.object,
  noteActions: React.PropTypes.object,
};
