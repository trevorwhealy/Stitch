import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';

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
          <Link key={folder.id} className="note" to={{ pathname: `/folders/${folder.id}` }}>
            <div className="details">
              <div className="name">{folder.name}</div>
              <div className="date">{moment(folder.createdAt).fromNow()}</div>
            </div>
            <div onClick={this.preventDropdownLink} className="elipses">
              <div className="icon-btn list__more-actions dropdown-btn">
                <i className="material-icons">more_vert</i>
                <ul className="dropdown-menu dropdown-menu--right">
                  <li onClick={() => this.renameContentModal(folder)}>
                    Rename
                  </li>
                  <li onClick={() => this.shareContentModal(folder)}>
                    Share
                  </li>
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
    let foldersLength;
    if (this.props.folders) {
      foldersLength = (folders.length > 6) ?
        <div>
          <div className="number">{`${folders.length} folders found`}</div>
          <div className="prompt">
            <div>{'Scroll for more'}</div>
            <div><i className="material-icons">keyboard_arrow_down</i></div>
          </div>
        </div>
            : '';
    }
    return (
      <div className="folderFiles">
        <div className="title">{'All Folders'}</div>
        <div className="notes">
          {allFolders}
        </div>
        {foldersLength}
        {/* Modals */}
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
