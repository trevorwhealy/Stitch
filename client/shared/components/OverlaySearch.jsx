import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActionCreators from '../actions/SearchActions.jsx';
import OverlaySearchResults from './OverlaySearchResults.jsx';

class OverlaySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverLayClicked: false,
      isActive: false,
    };
    this.displayOverlay = this.displayOverlay.bind(this);
    this.fileChoice = this.fileChoice.bind(this);
    this.folderChoice = this.folderChoice.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.displayOverlay = this.displayOverlay.bind(this);
  }

  displayOverlay() {
    this.setState({
      isOverLayClicked: !this.state.isOverLayClicked,
    });
  }

  isActive() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }

  searchInput(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        this.props.searchActions.globalSearch(this.state.fileOrFolderChoice, e.target.value);
        e.target.value = '';
      }
    }
  }

  fileChoice() {
    this.setState({
      fileOrFolderChoice: 'notes',
    });
  }

  folderChoice() {
    this.setState({
      fileOrFolderChoice: 'folders',
    });
  }

  render() {
    let display;
    if (this.state.isOverLayClicked) {
      display = (
        <div className="overlay">
          <div className="overlay-navbar">
            <div className="overlay-close" onClick={this.displayOverlay}>
              <i className="material-icons closeButton">close</i>
            </div>
          </div>
          <div className="overlay-responsive">
            <div className="searchFileOrFolder">
              <i className="material-icons searchIcon">search</i>
              <div className="fileOrFolderChoice">
                <div className="userSearchFile isActive" onClick={this.fileChoice}>
                  {'File'}
                </div>
                <div className="userSearchFolder" onClick={this.folderChoice}>
                  {'Folder'}
                </div>
              </div>
            </div>
            <div className="searchAllInput">
              <input className="userQuery" type="text" onKeyDown={this.searchInput} />
            </div>
          </div>
          <OverlaySearchResults toggleOverlay={this.displayOverlay} />
        </div>
      );
    } else {
      display = (<div />);
    }

    return (
      <a className="icon-btn">
        <i className="material-icons searchButton" onClick={this.displayOverlay}>search</i>
        { display }
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(OverlaySearch);

OverlaySearch.propTypes = {
  searchActions: React.PropTypes.object,
};
