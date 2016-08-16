import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import moment from 'moment';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import * as folderActionCreators from '../actions/FolderActions.jsx';


class Home extends React.Component {

  componentWillMount() {
    this.props.noteActions.getAllNotes();
    this.props.folderActions.getAllFolders();

    sessionStorage.active = window.location.href;
  }

  addTheModal() {
    $('#addFolderModal').openModal();
  }

  addFolder(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        this.props.folderActions.createFolder(e.target.value);
        e.target.value = '';
        $('#addFolderModal').closeModal();
      }
    }
  }

  render() {
    const notes = this.props.notes.note || [];
    const folders = this.props.folders.folder;
    let recentNotes;
    let allFolders;
    if (notes) {
      recentNotes =
        notes.slice(0, 3).map(note => {
          return (
            <Link className="note" to={{ pathname: `notes/${note.id}` }} >
              <div className="top">{''}</div>
              <div className="bottom">
                <div className="noteTitle">
                  {note.name}
                </div>
                <div className="noteDetails">
                  {`Updated ${moment(note.updatedAt).fromNow()}`}
                  {/*note.updatedAt.slice(0, 10)}`*/}
                </div>
              </div>
            </Link>
          );
        });
    }

    if (folders) {
      allFolders =
        folders.slice(0, 3).map(folder => {
          return (
            <Link className="eachFolder" to={{ pathname: `folders/${folder.id}` }} >
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
            </Link>
          );
        });
    }

    return (
      <div className="HomeContainer">
        <div className="recent">
          <div className="title"> {'RECENT NOTES'} </div>
          <div className="notes">
            <Link className="note" to={{ pathname: 'notes/new' }} >
              <div className="top">{''}</div>
              <div className="bottom">
                <div className="noteTitle">
                  {'Create a new note'}
                </div>
              </div>
            </Link>
            {recentNotes}
          </div>
        </div>

        <div className="folderContainer">
          <div className="folderHeader">
            <div>{'Folders'}</div>
            <div onClick={this.addTheModal.bind(this)} className="add">
              <i className="material-icons">add</i>
              <div className="addFolder">{'NEW FOLDER'}</div>
              <div id="addFolderModal" className="modal">
                <div className="modal-content">
                  <center>
                    <h5 style={{ marginBottom: '20px' }}> Add a new folder </h5>
                    <input style={{ textAlign: "center", fontSize: "1.7em", padding: '5px' }} type="text" onKeyDown={this.addFolder.bind(this)} />
                    <p style={{ fontSize: '.5em', color: 'gray' }}><i>Press Enter to Save</i></p>
                  </center>
                </div>
              </div>
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
