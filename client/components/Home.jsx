import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import moment from 'moment';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import * as folderActionCreators from '../actions/FolderActions.jsx';

import DeleteFolder from './modals/DeleteFolder.jsx';
import AddFolder from './modals/AddFolder.jsx';
import RenameFolder from './modals/RenameFolder.jsx';
import ShareContent from './modals/ShareContent.jsx';

class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      folderToDelete: '',
      folderToRename: '',
      contentToShare: '',
    };
  }

  componentWillMount() {
    this.props.noteActions.getAllNotes();
    this.props.folderActions.getAllFolders();
    sessionStorage.active = window.location.href;
  }

  addFolderModal() {
    $('#addFolderModal').openModal();
  }

  deleteFolderModal(folder) {
    this.setState({
      folderToDelete: folder,
    });
    $('#deleteFolderModal').openModal();
  }

  renameFolderModal(folder) {
    this.setState({
      folderToRename: folder,
    });
    $('#renameFolderModal').openModal();
  }

  shareContentModal(content) {
    this.setState({
      contentToShare: content,
    });
    $('#shareContentModal').openModal();
  }

  preventDropdownLink(e) {
    e.preventDefault();
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
            <Link className="note" to={{ pathname: `/notes/${note.id}` }} >
              <div className="top">{''}</div>
              <div className="bottom">
                <div className="noteTitle">
                  {note.name}
                </div>
                <div className="noteDetails">
                  {`Updated ${moment(note.updatedAt).fromNow()}`}
                </div>
              </div>
            </Link>
          );
        });
    }

    if (folders) {
      allFolders =
        folders.slice(0, 7).map(folder => {
          return (
            <Link to={{ pathname: `/folders/${folder.id}` }} className="eachFolder">
              <div className="folderContents">
                <i className="material-icons">folder</i>
                <div className="content">
                  <div className="top">
                    {folder.name}
                    {folder.shared ? 'shared' : ''}
                  </div>
                  <div className="bottom">
                    {`${folder.notes.length} notes`}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    {`Created by ${folder.user.fullName}`}
                  </div>
                </div>
              </div>
              <div onClick={this.preventDropdownLink} className="elipses">
                <div className="icon-btn list__more-actions dropdown-btn">
                  <i className="material-icons">more_vert</i>
                  <ul className="dropdown-menu dropdown-menu--right">
                    <li onClick={() => this.renameFolderModal(folder)}>
                      Rename
                    </li>
                    <li onClick={this.shareFolder}>Share</li>
                    <li onClick={this.renameFolder}>Rename</li>
                    <li onClick={() => this.shareContentModal(folder)}>Share</li>
                    <li onClick={() => this.deleteFolderModal(folder)}>
                      Delete
                    </li>
                  </ul>
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
            <Link className="note" to={{ pathname: '/notes/new' }} >
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
            <div onClick={this.addFolderModal} className="add">
              <i className="material-icons">add</i>
              <div className="addFolder">{'NEW FOLDER'}</div>
            </div>
          </div>
          <div className="folders">
            {allFolders}
          </div>
        </div>

        {/* Modals */}
        <AddFolder />
        <DeleteFolder folder={this.state.folderToDelete} />
        <RenameFolder folder={this.state.folderToRename} />
        <ShareContent content={this.state.contentToShare} />
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
