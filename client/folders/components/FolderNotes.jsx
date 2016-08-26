import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as noteActionCreators from '../../notes/actions/NoteActions.jsx';
import * as folderActionCreators from '../actions/FolderActions.jsx';
import CreateNewNote from '../../notes/components/CreateNewNote.jsx';

import RenameContent from '../../shared/modals/RenameContent.jsx';
import DeleteContent from '../../shared/modals/DeleteContent.jsx';
import ShareContent from '../../shared/modals/ShareContent.jsx';

class FolderNotes extends React.Component {

  constructor() {
    super();

    this.state = {
      content: {},
      contentType: '',
    };
  }

  componentWillMount() {
    const folderId = this.props.routeParams.id;
    this.props.folderActions.getFolder(folderId);
    this.props.noteActions.getNotesInFolder(folderId);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.id;
    const newId = this.props.params.id;
    const folderId = this.props.routeParams.id;
    if (oldId !== newId) {
      this.props.folderActions.getFolder(folderId);
      this.props.noteActions.getNotesInFolder(folderId);
    }
  }

  renameContentModal(content, type) {
    this.setState({
      content,
      contentType: type,
    });
    $('#renameContentModal').openModal();
  }

  shareContentModal(content, type) {
    this.setState({
      content,
      contentType: type,
    });
    $('#shareContentModal').openModal();
  }

  deleteContentModal(content, type, redirectOnDelete) {
    this.setState({
      content,
      contentType: type,
      redirectOnDelete,
    });
    $('#deleteContentModal').openModal();
  }

  preventDropdownLink(e) {
    e.preventDefault();
  }

  render() {
    const folder = this.props.folder;
    const notes = this.props.notes;
    const createNoteInFolder = this.props.noteActions.createNoteInFolder;
    const folderId = this.props.routeParams.id;
    const folderTitle = this.props.folder.name;
    const redirectOnDelete = this.state.redirectOnDelete;

    return (
      <div className="pageWrapper FoldersContainer">
        <div className="pageHeader">
          <i className="material-icons folderIcon">folder</i>
          <div className="pageTitle">{folderTitle}</div>
          <button className="dropdown-btn folderActions">
            <i className="material-icons">keyboard_arrow_down</i>
            <ul className="dropdown-menu">
              <li onClick={() => this.renameContentModal(folder, 'folder')}>
                Rename
              </li>
              <li onClick={() => this.shareContentModal(folder, 'folder')}>
                Share
              </li>
              <li
                className="text-danger"
                onClick={() => this.deleteContentModal(folder, 'folder', true)}
              >
                Delete
              </li>
            </ul>
          </button>
          <span style={{ flex: 1 }} />
          <CreateNewNote createNoteInFolder={createNoteInFolder} folderId={folderId} />
        </div>
        <div className="number">{`${notes.length} notes`}</div>
        <div className="notes"> {notes.map(note => {
          return (
            <Link key={note.id} className="note" to={{ pathname: `/notes/${note.id}` }}>
              <div className="details">
                <div className="name">{note.name}</div>
                <div className="date">{moment(note.createdAt).fromNow()}</div>
              </div>
              <div onClick={this.preventDropdownLink} className="elipses">
                <div className="icon-btn list__more-actions dropdown-btn">
                  <i className="material-icons">more_vert</i>
                  <ul className="dropdown-menu dropdown-menu--right">
                    <li onClick={() => this.renameContentModal(note, 'note')}>
                      Rename
                    </li>
                    <li onClick={() => this.shareContentModal(note, 'note')}>
                      Share
                    </li>
                    <li
                      className="text-danger"
                      onClick={() => this.deleteContentModal(note, 'note', false)}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          );
        })}
        </div>
        {
          notes.length > 6 ?
            <div className="prompt">
              <div>{'Scroll for more'}</div>
              <div><i className="material-icons">keyboard_arrow_down</i></div>
            </div>
          : ''
        }
        {/* Modals */}
        <RenameContent type={this.state.contentType} content={this.state.content} />
        <DeleteContent
          type={this.state.contentType}
          content={this.state.content}
          redirect={redirectOnDelete}
        />
        <ShareContent type={this.state.contentType} content={this.state.content} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
  folderActions: bindActionCreators(folderActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    notes: state.notesInFolder.notes,
    folder: state.singleFolder.folder,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderNotes);

FolderNotes.propTypes = {
  routeParams: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  folderActions: React.PropTypes.object,
  notes: React.PropTypes.array,
  params: React.PropTypes.object,
  folder: React.PropTypes.object,
};
