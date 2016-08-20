import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../../actions/NoteActions.jsx';


class RenameNote extends React.Component {

  renameNote() {
    const newTitle = $('#renameNoteInput').val();
    if (newTitle.length) {
      this.setState({
        title: newTitle,
      });

      this.props.noteActions.renameNote(this.props.note.id, newTitle);
      this.closeModal();
      $('#renameNoteInput').val('');
      $('#noteName').text(newTitle);
      $('#renameNoteName').text(newTitle);
      $('#deleteNoteName').text(newTitle);
    }
  }

  closeModal() {
    $('#renameNoteModal').closeModal();
  }

  keyTracking(e) {
    if (e.keyCode === 13) {
      this.renameNote();
    }
  }

  render() {
    return (
      <div id="renameNoteModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> Are you sure you want to <b>rename</b> note: </h5>
            <h5 id="renameNoteName"><b>{this.props.note.name}</b></h5>
            <input id="renameNoteInput" style={{ textAlign: "center", fontSize: "1.7em", padding: '5px' }} type="text" onKeyDown={this.keyTracking.bind(this)} />
          </div>
        </center>
        <div className="cancelDelete">
          <button onClick={this.closeModal} className="waves-effect waves-gray btn-flat cancel">
            CANCEL
          </button>
          <button onClick={this.renameNote.bind(this)} className="waves-effect waves-orange btn-flat delete">
            UPDATE
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
)(RenameNote);

RenameNote.propTypes = {
  note: React.PropTypes.object,
  noteActions: React.PropTypes.object,
};
