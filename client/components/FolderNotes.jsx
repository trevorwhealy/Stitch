import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import * as folderActionCreators from '../actions/FolderActions.jsx';
import NewNote from './CreateNewNote.jsx';

class FolderNotes extends React.Component {

  componentWillMount() {
    const folderId = this.props.routeParams.id;
    this.props.noteActions.getNotesInFolder(folderId);
    this.props.folderActions.getFolder(folderId);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.id;
    const newId = this.props.params.id;
    const folderId = this.props.routeParams.id;
    if (oldId !== newId) {
      this.props.noteActions.getNotesInFolder(folderId);
    }
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
        <NewNote
          createNoteInFolder={createNoteInFolder}
          folderId={folderId}
        />
        <div className="notes"> {notes.map(note => {
          return (
            <Link className="note" to={{ pathname: `notes/${note.id}` }}>
              <div className="details">
                <div className="name">{note.name}</div>
                <div className="date">{moment(note.createdAt).fromNow()}</div>
              </div>
              <div className="open">{'OPEN'}</div>
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
