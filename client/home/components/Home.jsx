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
import Avatar from '../../shared/components/Avatar.jsx';

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
    this.props.folderActions.resetFolderState();
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
            <Link className="noteCard" key={note.id} to={{ pathname: `/notes/${note.id}` }} >
              <div className="cardImage">
                <Avatar photo={note.user.photo} fullName={note.user.fullName} size="sm" />
              </div>
              <div className="cardInfo">
                <div className="title">
                  {note.name}
                </div>
                <div className="details">
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
            <Link className="folderCard" key={folder.id} to={{ pathname: `/folders/${folder.id}` }}>
              <div className="cardImage">
                <i className="material-icons">folder</i>
              </div>
              <div className="cardInfo">
                <div className="title">
                  {folder.name}
                </div>
                <div className="details">
                  {`${folder.notes.length} notes`}
                  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                  {`Created by ${folder.user.fullName}`}
                </div>
              </div>
              <span style={{ flex: 1 }} />
              <div className="cardActions" onClick={this.preventDropdownLink}>
                <div className="icon-btn dropdown-btn">
                  <i className="material-icons">more_vert</i>
                  <ul className="dropdown-menu dropdown-menu--right">
                    <li onClick={() => this.renameFolderModal(folder)}>
                      Rename
                    </li>
                    <li onClick={() => this.shareContentModal(folder)}>Share</li>
                    <li className="text-danger" onClick={() => this.deleteContentModal(folder)}>
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
        <section className="recentNotes">
          <div className="recentNotes__header">
            <span className="sectionLabel">Recent Notes</span>
            <Link className="allBtn" to={{ pathname: '/notes' }} >
              <span>All notes</span>
              <i className="material-icons">keyboard_arrow_right</i>
            </Link>
            <span style={{ flex: 1 }} />
            <Link className="newBtn" to={{ pathname: '/notes/new' }} >
              <i className="material-icons">add</i>
              <span>New note</span>
            </Link>
          </div>
          <div className="noteList">
            {recentNotes}
          </div>
        </section>

        <section className="folders">
          <div className="folders__header">
            <span className="sectionLabel">Folders</span>
            <Link className="allBtn" to={{ pathname: '/folders' }} >
              <span>All folders</span>
              <i className="material-icons">keyboard_arrow_right</i>
            </Link>
            <span style={{ flex: 1 }} />
            <div className="newBtn" onClick={this.addFolderModal}>
              <i className="material-icons">add</i>
              <span className="addFolder">New folder</span>
            </div>
          </div>
          <div className="folderList">
            {allFolders}
          </div>
        </section>

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
