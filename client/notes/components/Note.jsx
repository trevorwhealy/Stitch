import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import RichEditor from '../../editor/RichEditor.jsx';
import Compiler from '../../editor/compiler/Compiler.jsx';

import DeleteContentModal from '../../shared/modals/DeleteContent.jsx';
import RenameContentModal from '../../shared/modals/RenameContent.jsx';
import ShareContentModal from '../../shared/modals/ShareContent.jsx';

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleTerminal: false,
    };
    this.toggleTerminal = this.toggleTerminal.bind(this);
  }

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

  deleteNote() {
    $('#deleteContentModal').openModal();
  }

  shareNote() {
    $('#shareContentModal').openModal();
  }

  toggleTerminal() {
    this.setState({
      toggleTerminal: !this.state.toggleTerminal,
    });
  }

  render() {
    const singleNote = this.props.note;
    const isTerminalActiveClass = this.state.toggleTerminal ? 'isTerminalActive' : '';
    const terminal = this.state.toggleTerminal ?
      (<div className="terminal">
        <p className="terminalTitle">Stitch Sandbox</p>
        <p className="terminalSubtitle">Compile within code using: <em>CTRL + ALT + c</em></p>
        <Compiler />
        <div className="compileAnswer" />
        <p className="compilesRemaining" />
      </div>) : '';

    $('#noteName').keydown((e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });

    $('#noteName').blur(() => {
      const newNoteName = $('#noteName').text();
      if (this.props.note.name !== newNoteName) {
        this.props.noteActions.renameNote(this.props.note, newNoteName);
      }
    });

    return (
      <div className={`pageWrapper NoteEditorContainer ${isTerminalActiveClass}`}>
        <div className="noteHeader">
          <div id="noteName" contentEditable>{singleNote.name || 'Untitled'}</div>
          <div className="dropdown-btn noteActions">
            <i className="material-icons">keyboard_arrow_down</i>
            <ul className="dropdown-menu">
              <li onClick={this.shareNote}>
                Share
              </li>
              <li className="text-danger" onClick={this.deleteNote}>
                Delete
              </li>
            </ul>
          </div>
        </div>
        <div className="EditorTerminal">
          <div className="editor">
            <RichEditor note={singleNote} />
          </div>
          {terminal}
        </div>
        <a
          onClick={this.toggleTerminal}
          className="btn-floating btn-large waves-effect waves-light terminalBtn"
        >
          <i className="material-icons">code</i>
        </a>

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
