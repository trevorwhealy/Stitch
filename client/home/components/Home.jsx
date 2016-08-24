import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import moment from 'moment';
import * as noteActionCreators from '../../notes/actions/NoteActions.jsx';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';
import * as notificationActionCreators from '../../notifications/actions/NotificationActions.jsx';

import AddFolder from '../../shared/modals/AddFolder.jsx';
import RenameContent from '../../shared/modals/RenameContent.jsx';
import ShareContent from '../../shared/modals/ShareContent.jsx';
import DeleteContent from '../../shared/modals/DeleteContent.jsx';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      folderToDelete: {},
      folderToRename: {},
      contentToShare: {},
    };
  }

  componentWillMount() {
    this.props.noteActions.getAllNotes();
    this.props.folderActions.getAllFolders();
    this.props.notificationActions.getNotifications();
    sessionStorage.active = window.location.href;
  }

  addFolderModal() {
    $('#addFolderModal').openModal();
  }

  deleteContentModal(folder) {
    this.setState({
      folderToDelete: folder,
    });
    $('#deleteContentModal').openModal();
  }

  renameFolderModal(folder) {
    this.setState({
      folderToRename: folder,
    });
    $('#renameContentModal').openModal();
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
    const notes = this.props.notes || [];
    const folders = this.props.folders;
    let recentNotes;
    let allFolders;
    if (notes) {
      recentNotes =
        notes.slice(0, 11).map(note => {
          return (
            <Link key={note.id} className="note" to={{ pathname: `/notes/${note.id}` }} >
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
            <Link key={folder.id} to={{ pathname: `/folders/${folder.id}` }} className="eachFolder">
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
                    <li onClick={() => this.shareContentModal(folder)}>Share</li>
                    <li onClick={() => this.deleteContentModal(folder)}>
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
          <div className="title">
            {'RECENT NOTES'}
            <Link className="goToAllNotes" to={{ pathname: '/notes' }} >
             {'All notes'}
              <i className="material-icons">keyboard_arrow_right</i>
            </Link>
          </div>
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
        <RenameContent type="folder" content={this.state.folderToRename} />
        <DeleteContent type="folder" content={this.state.folderToDelete} />
        <ShareContent content={this.state.contentToShare} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
  noteActions: bindActionCreators(noteActionCreators, dispatch),
  notificationActions: bindActionCreators(notificationActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    folders: state.folders.folder,
    notes: state.notes.notes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

Home.propTypes = {
  folderActions: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  folders: React.PropTypes.array,
  notes: React.PropTypes.array,
  notificationActions: React.PropTypes.object,
};
