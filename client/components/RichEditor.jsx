import React from 'react';
import {
  Editor,
  EditorState,
  // SelectionState,
  // ContentState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  // convertFromRaw,
  // CompositeDecorator,
  // Entity,
  // AtomicBlockUtils,
  // DefaultDraftBlockRenderMap,
} from 'draft-js';

import CodeUtils from 'draft-js-code';

const { hasCommandModifier } = KeyBindingUtil;

import {
  BlockStyleControls,
  InlineStyleControls,
} from './editor/toolbox/StyleControls.jsx';


export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.getEditorState = () => this.state.editorState;
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTab = this.handleTab.bind(this);
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
      // case 'blockquote': return 'RichEditor-blockquote';
      // case 'Code Block': return 'RichEditor-code-block-unique';
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

  keyBindingFn(e) {
    const { editorState } = this.state;
    let command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  }

  handleReturn(e) {
    const editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    );

    return true;
  }

  handleTab(e) {
    const editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    );
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    let newState;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }
    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
    if (command === 'myeditor-save') {
      console.log(convertToRaw(editorState.getCurrentContent()));

      return true;
    }
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
            customStyleMap={styleMap}
            editorState={editorState}
            keyBindingFn={this.keyBindingFn}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            onTab={this.handleTab}
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
      </div>
    );
  }
}

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};