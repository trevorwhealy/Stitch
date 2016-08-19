import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActionCreators from '../actions/SearchActions.jsx';

class OverlaySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverLayClicked: false,
      fileOrFolderChoice: 'notes',
    };
  }

  displayOverlay() {
    this.setState({
      isOverLayClicked: !this.state.isOverLayClicked,
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
    const fakeData = [
      {
        fileName: 'Physics',
        createdAt: 'June',
        fileType: 'folders',
      },
      {
        fileName: 'Chemistry',
        createdAt: 'May',
        fileType: 'folders',
      },
      {
        fileName: 'Gravity',
        createdAt: 'April',
        fileType: 'folders',
      },
      {
        fileName: 'Calc',
        createdAt: 'August',
        fiileType: 'folders',
      },
    ];

    const iconType = (fakeData[0].fileType === 'folders') ? 'folder' : 'insert_drive_file';

    let queryResults = fakeData.map(file => {
      return (
        <div className="userQueryResults">
          <div className="resultTypeAndFileName">
            <i className="material-icons folderIcon">{iconType}</i>
            <div className="resultFileName">
              {file.fileName}
            </div>
          </div>
          <div className="resultFileCreatedAt">
            {file.createdAt}
          </div>
        </div>
      );
    });

    let display;
    if (this.state.isOverLayClicked) {
      display = <div className="overlay">
                  <div className="overlay-navbar">
                    <div className="overlay-close" onClick={this.displayOverlay.bind(this)}>
                      <i className="material-icons closeButton">close</i>
                    </div>
                  </div>
                  <div className="overlay-responsive">
                    <div className="searchFileOrFolder">
                      <i className="material-icons searchIcon">search</i>
                      <div className="fileOrFolderChoice">
                        <div className="userSearchFile" onClick={this.fileChoice.bind(this)}>
                          {'File'}
                        </div>
                        <div className="userSearchFolder" onClick={this.folderChoice.bind(this)}>
                          {'Folder'}
                        </div>
                      </div>
                    </div>
                    <div className="searchAllInput">
                      <input className="userQuery" type="text" onKeyDown={this.searchInput.bind(this)}/>
                    </div>
                  </div>
                  <div className="overlay-searchResults">
                    {queryResults}
                  </div>
                </div>
    } else {
      display = <div className="test" />
    }

    return (
      <div>
        <i className="material-icons searchButton" onClick={this.displayOverlay.bind(this)}>search</i>
        { display }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    globalSearch: state.globalSearch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlaySearch);

OverlaySearch.propTypes = {
  searchActions: React.PropTypes.object,
};
