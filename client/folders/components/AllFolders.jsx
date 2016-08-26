import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';

import AddFolder from '../../shared/modals/AddFolder.jsx';
import RenameContent from '../../shared/modals/RenameContent.jsx';
import DeleteContent from '../../shared/modals/DeleteContent.jsx';
import ShareContent from '../../shared/modals/ShareContent.jsx';

class AllFolders extends React.Component {

  constructor() {
    super();

    this.state = {
      folderToRename: {},
      folderToDelete: {},
      contentToShare: {},
    };
  }

  componentWillMount() {
    this.props.folderActions.getAllFolders();
  }

  addFolderModal() {
    $('#addFolderModal').openModal();
  }

  renameContentModal(folder) {
    this.setState({
      folderToRename: folder,
    });
    $('#renameContentModal').openModal();
  }

  shareContentModal(folder) {
    this.setState({
      contentToShare: folder,
    });
    $('#shareContentModal').openModal();
  }

  deleteContentModal(folder) {
    this.setState({
      folderToDelete: folder,
    });
    $('#deleteContentModal').openModal();
  }

  preventDropdownLink(e) {
    e.preventDefault();
  }

  render() {
    const folders = this.props.folders;

    let allFolders;
    if (this.props.folders) {
      allFolders = folders.map(folder => {
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
            <div className="cardActions" onClick={this.preventDropdownLink}>
              <div className="icon-btn dropdown-btn">
                <i className="material-icons">more_vert</i>
                <ul className="dropdown-menu dropdown-menu--right">
                  <li onClick={() => this.renameContentModal(folder)}>
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
      <div className="pageWrapper FoldersContainer">
        <div className="pageHeader">
          <i className="material-icons folderIcon">folder</i>
          <div className="pageTitle">
            All Folders <small>{`(${folders.length})`}</small>
          </div>
          <span style={{ flex: 1 }} />
          <div className="newFolderBtn" onClick={this.addFolderModal}>
            <i className="material-icons">add</i>
            <span className="addFolder">New folder</span>
          </div>
        </div>
        <div className="folderList">
          {allFolders}
        </div>

        {/* Modals */}
        <AddFolder />
        <RenameContent type="folder" content={this.state.folderToRename} />
        <DeleteContent type="folder" content={this.state.folderToDelete} />
        <ShareContent type="folder" content={this.state.contentToShare} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    folders: state.folders.folder,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllFolders);

AllFolders.propTypes = {
  routeParams: React.PropTypes.object,
  folderActions: React.PropTypes.object,
  folders: React.PropTypes.array,
  params: React.PropTypes.object,
};
