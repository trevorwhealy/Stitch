import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import Avatar from '../../shared/components/Avatar.jsx';

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
              className="noteCard"
            >
              <div className="cardImage">
                <i className="material-icons folderIcon">{iconType}</i>
              </div>
              <div className="cardInfo">
                <div className="title">
                  {folder.name}
                </div>
                <div className="details">
                  {folder.notes.length} notes | Created by {folder.user.fullName}
                </div>
              </div>
            </Link>
            );
        });
      } else if (globalSearchResults[0].type === 'note') {
        queryResults = globalSearchResults.map(note => {
          return (
            <Link
              className="noteCard"
              to={{ pathname: `/notes/${note.id}` }}
              onClick={() => toggleOverlay()}
            >
              <div className="cardImage">
                <Avatar photo={note.user.photo} fullName={note.user.fullName} size="sm" />
              </div>
              <div className="cardInfo">
                <div className="title">
                  {note.name}
                </div>
                <div className="details">
                  {`Updated ${moment(note.updatedAt).fromNow()}`}
                </div>
              </div>
            </Link>
            );
        });
      }
    }
    return (
      <div className="overlaySearchContainer pageWrapper">
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
