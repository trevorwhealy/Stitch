import React from 'react';
import { Editor, EditorState } from 'draft-js';


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }


  render() {
  const { editorState } = this.state;
    return(
      <div className="PageContainer">
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

export default Page;
