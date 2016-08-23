import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import RichEditor from './RichEditor.jsx';
import Compiler from './compiler/Compiler.jsx';

import DeleteContentModal from './modals/DeleteContent.jsx';
import RenameContentModal from './modals/RenameContent.jsx';
import ShareContentModal from './modals/ShareContent.jsx';

class Note extends React.Component {

  componentWillMount() {
    const noteId = this.props.routeParams.id;
    this.props.noteActions.getOneNote(noteId);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.id;
    const newId = this.props.params.id;
    const noteId = this.props.routeParams.id;
    if (oldId !== newId) {
      this.props.noteActions.getOneNote(noteId);
    }
  }

  renameNote() {
    $('#renameContentModal').openModal();
  }

  deleteNote() {
    $('#deleteContentModal').openModal();
  }

  shareNote() {
    $('#shareContentModal').openModal();
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
            <div onClick={this.shareNote} className="chip">
              Share
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
            <p className="compilesRemaining" />
            <Compiler />
            <div className="compileAnswer" />
          </div>
        </div>

        {/* Modals*/}
        <DeleteContentModal type="note" content={this.props.note} redirect="true" />
        <RenameContentModal type="note" content={this.props.note} />
        <ShareContentModal type="note" content={this.props.note} />
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
  params: React.PropTypes.object,
};
