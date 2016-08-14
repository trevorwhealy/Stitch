import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import RichEditor from './RichEditor.jsx';

class Note extends React.Component {

  componentWillMount() {
    const noteId = this.props.routeParams.id;
    this.props.noteActions.getOneNote(noteId);
  }

  render() {
    return (
      <div className="NoteContainer">
        <div className="noteTitle">
          {'Biology Notes'}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);

Note.propTypes = {
  noteActions: React.PropTypes.object,
  routeParams: React.PropTypes.object,
};
