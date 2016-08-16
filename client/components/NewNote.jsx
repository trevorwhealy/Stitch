import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import RichEditor from './RichEditor.jsx';

class NewNote extends React.Component {

  componentWillMount() {
    if (sessionStorage.active !== window.location.href) {
      this.props.noteActions.createNote();
      sessionStorage.active = window.location.href;
    }
  }

  render() {
    const singleNote = this.props.singleNote.note;
    return (
      <div className="NoteContainer">
        <div className="noteTitle">
          {'Untitled'}
        </div>
        <div className="editor">
          <RichEditor />
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
)(NewNote);

NewNote.propTypes = {
  noteActions: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  singleNote: React.PropTypes.object,
};
