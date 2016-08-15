import React from 'react';
import {
  Editor,
  EditorState,
  // SelectionState,
  // ContentState,
  RichUtils,
  // convertToRaw,
  // convertFromRaw,
  // CompositeDecorator,
  // Entity,
  // AtomicBlockUtils,
  // DefaultDraftBlockRenderMap,
} from 'draft-js';

import {
  BlockStyleControls,
  InlineStyleControls,
} from  './utils/StyleControls.jsx';

import Compiler from './blocks/Compiler.jsx';
// import {Map} from 'immutable';

// import { Map } from 'immutable';

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.getEditorState = () => this.props.editorState;

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.logState = () => console.log(this.state.editorState.toJS());
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      case 'Code Block': return 'RichEditor-code-block-unique';
      default: return null;
    }
  }

  // myBlockRenderer(contentBlock) {
  //   console.log(contentBlock);
  //   const type = contentBlock.getType();
  //   if ( type === 'Code Block') {
  //     return {
  //       component: Compiler,
  //       editable: true,
  //     }
  //   }
  // }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={this.getBlockStyle}
            blockRendererFn={this.myBlockRenderer}
            // customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Start your adventure..."
            ref="editor"
            spellCheck={true}
          />
        </div>
        <input
          onClick={this.logState}
          // style={styles.button}
          type="button"
          value="Log State"
        />
        <Compiler />
      </div>
    );
  }
}
