import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../../notes/actions/NoteActions.jsx';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';

class DeleteContent extends React.Component {
  constructor() {
    super();
    this.deleteContent = this.deleteContent.bind(this);
  }

  deleteContent() {
    if (this.props.type === 'folder') {
      this.props.folderActions.deleteFolder(this.props.content.id, this.props.redirect);
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
    const { content, type } = this.props;
    const count = type === 'folder' ? <small>{`(${content.notes.length})`}</small> : '';
    return (
      <div id="deleteContentModal" className="modal">
        <div className="modal-content">
          <h5>Delete {type}</h5>
          <div className="subtitle">You can <em>never</em> get this {type} back</div>
          <div className="itemToDelete">
            <i className="material-icons">{type}</i>
            <span>{content.name}</span> {count}
          </div>
        </div>
        <div className="modalActions">
          <button onClick={this.closeModal} className="waves-effect btn-flat cancelBtn">
            CANCEL
          </button>
          <button
            onClick={this.deleteContent} className="waves-effect waves-red btn-flat deleteBtn"
          >
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
  redirect: React.PropTypes.bool,
  content: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  folderActions: React.PropTypes.object,
};
