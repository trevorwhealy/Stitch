import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class OverlaySearchResults extends React.Component {

  render() {
    const globalSearchResults = this.props.results;
    const toggleOverlay = this.props.toggleOverlay;
    let queryResults;

    if (globalSearchResults.length > 0) {
      if (globalSearchResults[0].type === 'folder') {
        const iconType = 'folder';
        queryResults = globalSearchResults.map(folder => {
          return (
            <Link
              to={{ pathname: `/folders/${folder.id}` }}
              onClick={() => toggleOverlay()}
              className="userQueryResults"
            >
              <div className="resultTypeAndFileName">
                <i className="material-icons folderIcon">{iconType}</i>
                <div className="resultFileName">
                  {folder.name}
                </div>
              </div>
              <div className="resultContentsAndUser">
                {folder.notes.length} notes | created by {folder.user.fullName}
              </div>
            </Link>
            );
        });
      } else if (globalSearchResults[0].type === 'note') {
        const iconType = 'insert_drive_file';
        queryResults = globalSearchResults.map(note => {
          return (
            <Link
              to={{ pathname: `/notes/${note.id}` }}
              onClick={() => toggleOverlay()}
              className="userQueryResults"
            >
              <div className="resultTypeAndFileName">
                <i className="material-icons folderIcon">{iconType}</i>
                <div className="resultFileName">
                  {note.name}
                </div>
              </div>
              <div className="resultContentsAndUser">
                created by {note.user.fullName}
              </div>
            </Link>
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
    results: state.globalSearch.files,
  };
};

export default connect(
  mapStateToProps,
  null
)(OverlaySearchResults);

OverlaySearchResults.propTypes = {
  fileChoice: React.PropTypes.string,
  results: React.PropTypes.array,
  singleNote: React.PropTypes.object,
};
