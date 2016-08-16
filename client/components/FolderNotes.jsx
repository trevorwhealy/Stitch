import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as noteActionCreators from '../actions/NoteActions.jsx';

class FolderNotes extends React.Component {

  componentWillMount() {
    const folderId = this.props.routeParams.id;
    this.props.noteActions.getNotesInFolder(folderId);
  }

  render() {
    const notesInFolder = this.props.notesInFolder.notes;
    return (
      <div className="folderFiles">
        <div className="title">{'Folder Name'}</div>
        <div className="number">{`${notesInFolder.length} notes found`}</div>
        <div className="notes"> {notesInFolder.map(note => {
          return (
            <Link className="note" to={{ pathname: `notes/${note.id}` }}>
              <div className="details">
                <div className="name">{note.name}</div>
                <div className="date">{moment(note.createdAt).fromNow()}</div>
              </div>
              <div className="open">{'OPEN'}</div>
            </Link>
          );
        })}
        </div>
        {
          notesInFolder.length > 6 ?
            <div className="prompt">
              <div>{'Scroll for more'}</div>
              <div><i className="material-icons">keyboard_arrow_down</i></div>
            </div>
          : ''
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    notesInFolder: state.notesInFolder,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderNotes);

FolderNotes.propTypes = {
  routeParams: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  notesInFolder: React.PropTypes.object,
};
