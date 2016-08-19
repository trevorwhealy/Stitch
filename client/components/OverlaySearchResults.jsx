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
const iconType = (fakeData[0].fileType === 'folders') ? 'folder' : 'insert_drive_file';

class OverlaySearchResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const globalSearchResults = this.props.globalSearch.files;
    console.log(globalSearchResults)
    let queryResults;
    if(globalSearchResults) {
      queryResults = fakeData.map(file => {
        return (
          <div className="userQueryResults">
            <div className="resultTypeAndFileName">
              <i className="material-icons folderIcon">{iconType}</i>
              <div className="resultFileName">
                {file.name}
              </div>
            </div>
            <div className="resultContentsAndUser">
              {file.notes.length} notes | created by {file.user.fullname}
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

const mapStateToProps = (state) => {
  return {
    globalSearch: state.globalSearch,
  };
};

export default connect(
  mapStateToProps,
  null
)(OverlaySearchResults);
