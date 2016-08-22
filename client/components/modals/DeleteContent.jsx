import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../../actions/NoteActions.jsx';
import * as folderActionCreators from '../../actions/FolderActions.jsx';

class DeleteContent extends React.Component {
  constructor() {
    super();
    this.deleteContent = this.deleteContent.bind(this);
  }

  deleteContent() {
    if (this.props.type === 'folder') {
      this.props.folderActions.deleteFolder(this.props.content.id);
    } else if (this.props.type === 'note') {
      if (this.props.redirect) {
        this.props.noteActions.deleteNote(this.props.content.id, true);
      } else {
        this.props.noteActions.deleteNote(this.props.content.id);
        this.props.noteActions.getNotesInFolder(this.props.content.folderId);
      }
    }
    this.closeModal();
  }

  closeModal() {
    $('#deleteContentModal').closeModal();
  }


  render() {
    return (
      <div id="deleteContentModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> Are you sure you want to <b>delete</b> {this.props.type}: </h5>
            <h5 id="deleteNoteName"><b>{this.props.content.name}</b></h5>
          </div>
        </center>
        <div className="cancelDelete">
          <button onClick={this.closeModal} className="waves-effect waves-gray btn-flat cancel">
            CANCEL
          </button>
          <button onClick={this.deleteContent} className="waves-effect waves-red btn-flat delete">
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
  folderActions: bindActionCreators(folderActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(DeleteContent);

DeleteContent.propTypes = {
  type: React.PropTypes.string,
  redirect: React.PropTypes.string,
  content: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  folderActions: React.PropTypes.object,
};
