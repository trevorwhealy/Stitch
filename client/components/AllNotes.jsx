import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as noteActionCreators from '../actions/NoteActions.jsx';

import RenameContent from './modals/RenameContent.jsx';
import DeleteContent from './modals/DeleteContent.jsx';
import ShareContent from './modals/ShareContent.jsx';

class AllNotes extends React.Component {

  constructor() {
    super();

    this.state = {
      noteToRename: '',
      noteToDelete: '',
      contentToShare: '',
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
          <Link key={note.id} className="note" to={{ pathname: `/notes/${note.id}` }}>
            <div className="details">
              <div className="name">{note.name}</div>
              <div className="date">{moment(note.createdAt).fromNow()}</div>
            </div>
            <div onClick={this.preventDropdownLink} className="elipses">
              <div className="icon-btn list__more-actions dropdown-btn">
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
    let notesLength;
    if (this.props.notes) {
      notesLength = (notes.length > 6) ?
        <div>
          <div className="number">{`${notes.length} notes found`}</div>
          <div className="prompt">
            <div>{'Scroll for more'}</div>
            <div><i className="material-icons">keyboard_arrow_down</i></div>
          </div>
        </div>
            : '';
    }
    return (
      <div className="folderFiles">
        <div className="title">{'All Notes'}</div>
        <div className="notes">
          {allNotes}
        </div>
        {notesLength}
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
