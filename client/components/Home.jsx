import React from 'react';
import { Editor, EditorState } from 'draft-js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  render() {
    const { editorState } = this.state;
    return <Editor editorState={editorState} onChange={this.onChange} />;
  }
}

    // </div> 
    // <div className="homeContainer"> 
export default Home;
