import React from 'react';
import { connect } from 'react-redux';

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

OverlaySearchResults.propTypes = {
  fileChoice: React.PropTypes.string,
  globalSearch: React.PropTypes.object,
  singleNote: React.PropTypes.object,
};
