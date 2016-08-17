import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import RichEditor from './RichEditor.jsx';
import Compiler from './compiler/Compiler.jsx';

class Note extends React.Component {

  componentWillMount() {
    const noteId = this.props.routeParams.id;
    this.props.noteActions.getOneNote(noteId);
  }

  render() {
    const singleNote = this.props.singleNote.note;
    return (
      <div className="NoteContainer">
        <div className="noteTitle">
          {singleNote.name}
        </div>
        <div className="EditorTerminal">
          <div className="editor">
            <RichEditor />
          </div>
          <div className="terminal">
            <Compiler />
            <p> Welcome to the ride of your life </p>
          </div>
        </div>
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
    singleNote: state.singleNote,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);

Note.propTypes = {
  noteActions: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  singleNote: React.PropTypes.object,
};
