import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import * as folderActionCreators from '../actions/FolderActions.jsx';

class Home extends React.Component {

  componentWillMount() {
    this.props.noteActions.getAllNotes();
    this.props.folderActions.getAllFolders();
  }

  getSingleNote(noteId) {
    this.props.noteActions.getOneNote(noteId);
  }

  render() {
    const notes = this.props.notes.note;
    const folders = this.props.folders.folder;
    let recentNotes;
    let allFolders;

    if (notes) {
      recentNotes =
        notes.map(note => {
          return (
            <Link className="note" to={{ pathname: `note/${note.id}` }} >
              <div className="top">{''}</div>
              <div className="bottom">
                <div className="noteTitle">
                  {note.name}
                </div>
                <div className="noteDetails">
                  {`Updated at ${note.updatedAt.slice(0, 10)}`}
                </div>
              </div>
            </Link>
          );
        });
    }

    if (folders) {
      allFolders =
        folders.map(folder => {
          return (
            <div className="eachFolder">
              <div className="folderContents">
                <i className="material-icons">folder</i>
                <div className="content">
                  <div className="top">
                    {folder.name}
                    {folder.shared ? 'shared' : ''}
                  </div>
                  <div className="bottom">
                    {`${3} notes`}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    {`Created by ${folder.user.fullName}`}
                  </div>
                </div>
              </div>
              <div>
                <div className="elipses">
                  <i className="material-icons">more_vert</i>
                </div>
              </div>
            </div>
          );
        });
    }

    return (
      <div className="HomeContainer">
        <div className="recent">
          <div className="title"> {'RECENT NOTES'} </div>
          <div className="notes">
            <div className="note">
              <div className="top">{''}</div>
              <div className="bottom">
                <div className="noteTitle">
                  {'Create a new note'}
                </div>
              </div>
            </div>
            {recentNotes}
          </div>
        </div>

        <div className="folderContainer">
          <div className="folderHeader">
            <div>{'Folders'}</div>
            <div className="add">
              <i className="material-icons">add</i>
              <div className="addFolder">{'NEW FOLDER'}</div>
            </div>
          </div>
          <div className="folders">
            {allFolders}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
    notes: state.notes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

Home.propTypes = {
  folderActions: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  folders: React.PropTypes.object,
  notes: React.PropTypes.object,
};
