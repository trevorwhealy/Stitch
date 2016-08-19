import React from 'react';
import { connect } from 'react-redux';

const fakeData = [
  {
    fileName: 'Physics',
    createdAt: 'June',
    notes: [1],
    user: { fullname: 'Sunny' },
    fileType: 'folders',
  },
  {
    fileName: 'Chemistry',
    createdAt: 'May',
    notes: [1, 2, 3],
    user: { fullname: 'Sompop' },
    fileType: 'folders',
  },
  {
    fileName: 'Gravity',
    createdAt: 'April',
    notes: [],
    user: { fullname: 'Steven' },
    fileType: 'folders',
  },
  {
    fileName: 'Calc',
    createdAt: 'August',
    notes: [2, 3, 5],
    user: { fullname: 'Trevor' },
    fileType: 'folders',
  },
];

class OverlaySearchResults extends React.Component {

  render() {
    const globalSearchResults = this.props.globalSearch.files;
    let queryResults;
    if (globalSearchResults) {
      if (this.props.fileChoice === 'folders') {
        const iconType = 'folder';
        queryResults = globalSearchResults.map(file => {
          return (
            <div className="userQueryResults">
              <div className="resultTypeAndFileName">
                <i className="material-icons folderIcon">{iconType}</i>
                <div className="resultFileName">
                  {file.name}
                </div>
              </div>
              <div className="resultContentsAndUser">
                {file.notes.length} notes | created by {file.user.fullName}
              </div>
            </div>
            );
        });
      } else if (this.props.fileChoice === 'notes') {
        const iconType = 'insert_drive_file';
        queryResults = globalSearchResults.map(file => {
          return (
            <div className="userQueryResults">
              <div className="resultTypeAndFileName">
                <i className="material-icons folderIcon">{iconType}</i>
                <div className="resultFileName">
                  {file.name}
                </div>
              </div>
              <div className="resultContentsAndUser">
                created by {file.user.fullName}
              </div>
            </div>
            );
        });
      }
      return (
        <div className="overlay-searchResults">
          {queryResults}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    globalSearch: state.globalSearch,
  };
};

export default connect(
  mapStateToProps,
  null
)(OverlaySearchResults);
