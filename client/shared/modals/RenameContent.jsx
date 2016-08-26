import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';
import * as noteActionCreators from '../../notes/actions/NoteActions.jsx';

class RenameContent extends React.Component {
  constructor() {
    super();

    this.onInputRender = this.onInputRender.bind(this);
    this.keyTracking = this.keyTracking.bind(this);
    this.renameContent = this.renameContent.bind(this);
  }

  onInputRender(inputEl) {
    this.inputEl = inputEl;
  }

  renameContent() {
    const newName = this.inputEl.value;
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
      this.inputEl.value = '';
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
    const { content, type } = this.props;
    if (content && content.name && this.inputEl) {
      this.inputEl.value = content.name;
      setTimeout(() => this.inputEl.focus(), 500);
    }

    return (
      <div id="renameContentModal" className="modal">
        <center>
          <div className="modal-content">
            <h5>Update {type} title</h5>
            <input
              ref={this.onInputRender}
              type="text"
              onKeyDown={this.keyTracking}
            />
          </div>
        </center>
        <div className="modalActions">
          <button onClick={this.closeModal} className="waves-effect btn-flat cancelBtn">
            CANCEL
          </button>
          <button
            onClick={this.renameContent}
            className="waves-effect btn-flat actionBtn"
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
