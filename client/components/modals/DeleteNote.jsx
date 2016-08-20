import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../../actions/NoteActions.jsx';

class DeleteNote extends React.Component {

  deleteNote() {
    this.props.noteActions.deleteNote(this.props.note.id);
    this.closeModal();
  }

  closeModal() {
    $('#deleteNoteModal').closeModal();
  }

  keyTracking(e) {
    if (e.keyCode === 13) {
      this.deleteNote();
    }
  }

  render() {
    return (
      <div id="deleteNoteModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> Are you sure you want to <b>delete</b> note: </h5>
            <h5 id="deleteNoteName"><b>{this.props.note.name}</b></h5>
          </div>
        </center>
        <div className="cancelDelete">
          <button onClick={this.closeModal} className="waves-effect waves-gray btn-flat cancel">
            CANCEL
          </button>
          <button onClick={this.deleteNote.bind(this)} className="waves-effect waves-red btn-flat delete">
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(DeleteNote);

DeleteNote.propTypes = {
  note: React.PropTypes.object,
  noteActions: React.PropTypes.object,
};
