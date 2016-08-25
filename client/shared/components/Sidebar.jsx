import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as folderActionCreators from '../../folders/actions/FolderActions.jsx';
import * as authActionCreators from '../../auth/actions/Auth.jsx';
import Avatar from './Avatar.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      addFolder: false,
    };
    this.searchInput = this.searchInput.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.toggleCreateFolder = this.toggleCreateFolder.bind(this);
    this.onAddFolderInputRender = this.onAddFolderInputRender.bind(this);
  }

  componentWillMount() {
    this.props.folderActions.getAllFolders();
    this.props.authActions.currentUser();
  }

  onAddFolderInputRender(component) {
    if (!component) { return; }
    component.focus();
    this.folderInput = component;
  }

  addFolder(e) {
    e.preventDefault();
    this.props.folderActions.createFolder(this.folderInput.value);
    this.setState({
      addFolder: false,
    });
    this.folderInput.value = '';
  }

  toggleCreateFolder() {
    this.setState({
      addFolder: !this.state.addFolder,
    });
  }

  searchInput(e) {
    this.setState({ searchInput: e.target.value });
  }

  render() {
    const currentFolderId = this.props.currentFolderId;
    const folders = this.props.folders.folder;
    const addFolderBox = this.state.addFolder ? (
      <form onSubmit={this.addFolder}>
        <input
          type="text"
          required
          ref={this.onAddFolderInputRender}
        />
      </form>
    ) : '';

    return (
      <div>
        <ul id="slide-out" className="side-nav">
          {/* User chip: userPhoto, userName, and userLogout */}
          <div className="user">
            <Avatar photo={this.props.user.photo} fullName={this.props.user.fullName} size="sm" />
            <div className="user__name">{this.props.user.fullName}</div>
            <button className="dropdown-btn user__dropdown">
              <i className="material-icons">keyboard_arrow_down</i>
              <ul className="dropdown-menu dropdown-menu--right">
                <li><Link className="text-danger" to="/logout">Logout</Link></li>
              </ul>
            </button>
          </div>

          {/* Searchbar */}
          <div className="searchbox">
            <i className="material-icons">search</i>
            <input type="text" placeholder="Search folders by name" onChange={this.searchInput} />
          </div>

          {/*  Create Folder: title and create button */}
          <div className="createFolder">
            <div className="title">FOLDERS</div>
            <div onClick={this.toggleCreateFolder} className="add" >
              NEW <i className="tiny material-icons alert">add</i>
            </div>
          </div>

          { addFolderBox }

          {/* Folder Names: names of folders */}
          <div className="folderList">
            {
              folders
                .filter(folder => {
                  const searchInput = this.state.searchInput;
                  if (!searchInput) { return true; }
                  return folder.name.match(new RegExp(searchInput, 'i'));
                })
                .map(folder => (
                  <Link
                    key={folder.id}
                    className={`folder ${folder.id === currentFolderId ? 'isActive' : ''}`}
                    to={`/folders/${folder.id}`}
                  >
                    <span className="folderName">{folder.name}</span>
                    <div className="noteCount">
                      {folder.notes.length ? <span>{folder.notes.length}</span> : ''}
                    </div>
                  </Link>
                ))
          }
          </div>
        </ul>

        {/* Actual button that will be clicked to open the sideNav */}
        <a data-activates="slide-out" className="button-collapse buttonSidebar icon-btn">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
  authActions: bindActionCreators(authActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
    user: state.user,
    currentFolderId: state.singleFolder.folder.id,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

Sidebar.propTypes = {
  folderActions: React.PropTypes.object,
  folders: React.PropTypes.object,
  user: React.PropTypes.object,
  authActions: React.PropTypes.object,
};
