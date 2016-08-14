import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../actions/FolderActions.jsx';

const userFullName = 'Trevor';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {
      addFolder: false,
    };
  }

  componentWillMount() {
    this.props.folderActions.getAllFolders();
  }

  createFolder() {
    this.setState({
      addFolder: true,
    });
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
              src="/assets/images/sunnyv.jpg"
              width="35" height="35"
            />
            <div className="name">{userFullName}</div>
            <i className="material-icons alert">power_settings_new</i>
          </div>

          {/* Searchbar */}
          <div className="search">
            <div className="left-inner-addon ">
              <i className="material-icons">search</i>
              <input className="query" type="text" placeholder="Search notes by Name or Tag" />
            </div>
          </div>

          {/*  Create Folder: title and create button */}
          <div className="createFolder">
            <div className="title"> FOLDERS </div>
            <div onClick={this.createFolder.bind(this)} className="add">NEW<i className="tiny material-icons alert">add</i></div>
          </div>

          { this.state.addFolder ? <input type="text" name="folderName" onKeyDown={this.addFolder.bind(this)} /> : '' }

          {/* Folder Names: names of folders */}
          <div className="folderNames">
            {folders.map(folder => {
              // TODO: decide how many folders we want to display - most recent 5? all of them?
              return (
                <div className="folder">
                  {folder.name}
                </div>
              );
            })}
          </div>
        </ul>

        {/* Actual button that will be clicked to open the sideNav */}
        <a href="#" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
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
