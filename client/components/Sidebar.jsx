import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as folderActionCreators from '../actions/FolderActions.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      addFolder: false,
    };
    this.searchInput = this.searchInput.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.createFolder = this.createFolder.bind(this);
  }

  componentWillMount() {
    this.props.folderActions.getAllFolders();
  }

  createFolder() {
    this.setState({
      addFolder: true,
    });
  }

  searchInput(e) {
    this.setState({ searchInput: e.target.value });
  }

  addFolder(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        this.props.folderActions.createFolder(e.target.value);
        this.setState({
          addFolder: false,
        });
        e.target.value = '';
      }
    }
  }

  render() {
    const folders = this.props.folders.folder;
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          {/* User chip: userPhoto, userName, and userLogout */}
          <div className="user">
            <img
              className="circle"
              alt="profile"
              src={this.props.user.photo}
              width="65" height="65"
            />
            <div className="name">{this.props.user.fullName}</div>
          </div>

          {/* Searchbar */}
          <div className="search">
            <div className="left-inner-addon ">
              <i className="material-icons">search</i>
              <input
                className="query"
                type="text"
                placeholder="Search folders by name"
                onChange={this.searchInput}
              />
            </div>
          </div>

          {/*  Create Folder: title and create button */}
          <div className="createFolder">
            <div className="title"> FOLDERS </div>
            <div
              onClick={this.createFolder}
              className="add"
            >NEW<i className="tiny material-icons alert">add</i>
            </div>
          </div>

          { this.state.addFolder
            ? <input type="text" name="folderName" onKeyDown={this.addFolder} /> : '' }

          {/* Folder Names: names of folders */}
          <div className="folderNames">
            {
              folders
                .filter(folder => {
                  const searchInput = this.state.searchInput;
                  if (!searchInput) { return true; }
                  return folder.name.match(new RegExp(searchInput, 'i'));
                })
                .map(folder => {
                // TODO: decide how many folders we want to display - most recent 5? all of them?
                  return (
                    <Link className="folder" to={{ pathname: `/folders/${folder.id}` }}>
                      {folder.name}
                    </Link>
                  );
                })
          }
          </div>
        </ul>

        {/* Actual button that will be clicked to open the sideNav */}
        <button data-activates="slide-out" className="button-collapse buttonSidebar">
          <i className="material-icons">menu</i>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

Sidebar.propTypes = {
  folderActions: React.PropTypes.object,
  folders: React.PropTypes.object,
};
