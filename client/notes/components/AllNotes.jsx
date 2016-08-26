import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as noteActionCreators from '../actions/NoteActions.jsx';

import RenameContent from '../../shared/modals/RenameContent.jsx';
import DeleteContent from '../../shared/modals/DeleteContent.jsx';
import ShareContent from '../../shared/modals/ShareContent.jsx';
import Avatar from '../../shared/components/Avatar.jsx';

class AllNotes extends React.Component {

  constructor() {
    super();

    this.state = {
      noteToRename: {},
      noteToDelete: {},
      contentToShare: {},
    };
  }

  componentWillMount() {
    this.props.noteActions.getAllNotes();
  }

  renameContentModal(note) {
    this.setState({
      noteToRename: note,
    });
    $('#renameContentModal').openModal();
  }

  shareContentModal(note) {
    this.setState({
      contentToShare: note,
    });
    $('#shareContentModal').openModal();
  }

  deleteContentModal(note) {
    this.setState({
      noteToDelete: note,
    });
    $('#deleteContentModal').openModal();
  }

  preventDropdownLink(e) {
    e.preventDefault();
  }

  render() {
    const notes = this.props.notes;
    let allNotes;
    if (this.props.notes) {
      allNotes = notes.map(note => {
        return (
          <Link className="noteCard" key={note.id} to={{ pathname: `/notes/${note.id}` }}>
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
            <div className="cardActions" onClick={this.preventDropdownLink} >
              <div className="icon-btn dropdown-btn">
                <i className="material-icons">more_vert</i>
                <ul className="dropdown-menu dropdown-menu--right">
                  <li onClick={() => this.renameContentModal(note)}>
                    Rename
                  </li>
                  <li onClick={() => this.shareContentModal(note)}>
                    Share
                  </li>
                  <li onClick={() => this.deleteContentModal(note)}>
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          </Link>
          );
      });
    }

    return (
      <div className="pageWrapper NotesContainer">
        <div className="pageHeader">
          <i className="material-icons noteIcon">notes</i>
          <div className="pageTitle">All Notes</div>
          <span style={{ flex: 1 }} />
          <Link className="newNoteBtn" to="/notes/new">
            <i className="material-icons">add</i>
            <span className="addFolder">New note</span>
          </Link>
        </div>
        <div className="noteList">
          {allNotes}
        </div>
        {/* Modals */}
        <RenameContent type="note" content={this.state.noteToRename} />
        <DeleteContent type="note" content={this.state.noteToDelete} />
        <ShareContent type="note" content={this.state.contentToShare} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllNotes);

AllNotes.propTypes = {
  routeParams: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  notes: React.PropTypes.array,
  params: React.PropTypes.object,
};
