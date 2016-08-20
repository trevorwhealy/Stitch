import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import RichEditor from './RichEditor.jsx';
import Compiler from './compiler/Compiler.jsx';
import RenameNoteModal from './modals/RenameNote.jsx';
import DeleteNoteModal from './modals/DeleteNote.jsx';

class Note extends React.Component {

  componentWillMount() {
    const noteId = this.props.routeParams.id;
    this.props.noteActions.getOneNote(noteId);
  }

  renameNote() {
    $('#renameNoteModal').openModal();
  }

  deleteNote() {
    $('#deleteNoteModal').openModal();
  }

  render() {
    const singleNote = this.props.note;
    return (
      <div className="NoteContainer">
        <div className="noteTitle">
          <div id="noteName">{singleNote.name}</div>
          <div className="actions">
            <div onClick={this.renameNote} className="chip">
              Rename
            </div>
            <div onClick={this.deleteNote} className="chip">
              Delete
            </div>
          </div>
        </div>
        <div className="EditorTerminal">
          <div className="editor">
            <RichEditor note={singleNote} />
          </div>
          <div className="terminal">
            <p> Fluid Notes Sandbox&#8482; </p>
            <p> Compile within code using: [ctrl]+[alt]+[c]</p>
            <p> Free uses remaining 426/500 </p>
            <Compiler />
            <div className="compileAnswer" />
          </div>
        </div>

        {/* Modals*/}
        <RenameNoteModal note={this.props.note} />
        <DeleteNoteModal note={this.props.note} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    note: state.singleNote.note,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);

Note.propTypes = {
  noteActions: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  note: React.PropTypes.object,
};
