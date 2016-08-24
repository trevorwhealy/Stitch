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
      noteToRename: {},
      noteToDelete: {},
      contentToShare: {},
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

  renameContentModal(note) {
    this.setState({
      noteToRename: note,
    });
    $('#renameContentModal').openModal();
  }

  shareContentModal(note) {
    this.setState({
      contentToShare: note,
    });
    $('#shareContentModal').openModal();
  }

  deleteContentModal(note) {
    this.setState({
      noteToDelete: note,
    });
    $('#deleteContentModal').openModal();
  }

  preventDropdownLink(e) {
    e.preventDefault();
  }

  render() {
    const notes = this.props.notes;
    const createNoteInFolder = this.props.noteActions.createNoteInFolder;
    const folderId = this.props.routeParams.id;
    const folderTitle = this.props.folder.name;

    return (
      <div className="folderFiles">
        <div className="title">{folderTitle}</div>
        <div className="number">{`${notes.length} notes found`}</div>
        <CreateNewNote createNoteInFolder={createNoteInFolder} folderId={folderId} />
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
                    <li onClick={() => this.renameContentModal(note)}>
                      Rename
                    </li>
                    <li onClick={() => this.shareContentModal(note)}>
                      Share
                    </li>
                    <li onClick={() => this.deleteContentModal(note)}>
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
        <RenameContent type="note" content={this.state.noteToRename} />
        <DeleteContent type="note" content={this.state.noteToDelete} />
        <ShareContent type="note" content={this.state.contentToShare} />
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
