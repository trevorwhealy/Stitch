import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  componentWillMount() {
    console.log(this.props.routeParams.id);
  }


  render() {
    const { editorState } = this.state;
    return (
      <div className="NoteContainer">
        <div className="noteTitle">
          {'Biology Notes'}
        </div>
        <div className="editor">
          <Editor editorState={editorState} onChange={this.onChange} />
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
