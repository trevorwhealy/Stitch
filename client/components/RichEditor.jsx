import React from 'react';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';

import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
} from 'draft-js';

import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import mentions from './editor/util/mentions';
import { StringToTypeMap } from './editor/util/constants';
import beforeInput from './editor/model/beforeInput';
import blockRenderMap from './editor/model/blockRenderMap.jsx';
import blockRendererFn from './editor/model/blockRendererFn';
import compiler from './compiler/compiler.js';
import { resetBlockWithType, insertPageBreak } from './editor/model/index';

const { hasCommandModifier } = KeyBindingUtil;
const mentionPlugin = createMentionPlugin();
const linkifyPlugin = createLinkifyPlugin();

const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin, linkifyPlugin];

import {
  BlockStyleControls,
  InlineStyleControls,
} from './editor/toolbox/StyleControls.jsx';

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      editEnabled: true,
      suggestions: mentions,
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.onSearchChange = ({ value }) => {
      this.setState({
        suggestions: defaultSuggestionsFilter(value, mentions),
      });
    };
    this.getEditorState = () => this.state.editorState;
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleBeforeInput = this.handleBeforeInput.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.handleReturn = this.handleReturn.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.logState = () => {console.log(convertToRaw(this.state.editorState.getCurrentContent()));
                           console.log(this.state.editorState.toJS());
                          }
    this.blockRendererFn = blockRendererFn(this.onChange, this.getEditorState);
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  toggleEdit(e) {
    this.setState({
      editEnabled: !this.state.editEnabled,
    });
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'todo': return 'block-todo';
      default: return null;
    }
  }

  keyBindingFn(e) {
    const { editorState } = this.state;
    if (e.ctrlKey) {
      if (e.altKey) {
        if (e.keyCode === 67) {
          return 'myeditor-save';
        }
      }
    }
    return getDefaultKeyBinding(e);
  }

  handleBeforeInput(str) {
    const { editorState } = this.state;
    return beforeInput(editorState, str, this.onChange, StringToTypeMap);
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    let newState;

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
    if (command === 'myeditor-save') {
      const answer = $(document.getSelection().focusNode).closest('.public-DraftStyleDefault-pre').text();
      const lang = document.getElementById('language').value;

      console.log(lang);

      compiler(answer, lang)
      .then(res => res.json())
      .then(data => {
        const $p = $(`<p> ${data.stdout} </p>`);
        const $answer = $('.compileAnswer');

        $answer.append($p);
        console.log($p.position(), $p.height(), $p.offset());
        $answer.animate({ scrollTop: $p.position().top + $p.height() }, 250);
      })
      .catch(err => {
        switch(err) {
          case 'no code typed':
            break;
          case 'no lang selected':
            const languageDropdown = $('.compilerContainer').find('.select-dropdown');

            console.log(languageDropdown);

            languageDropdown.addClass("pickLanguage").delay(1000).queue(function(){
              $(this).removeClass("pickLanguage").dequeue();
            });
            break;
          default:
            console.log(err);
        }
      });
      return true;
    }
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  insertPageBreak() {
    const { editorState } = this.state;
    this.setState({
      editorState: insertPageBreak(editorState),
    });
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
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={blockRenderMap}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            keyBindingFn={this.keyBindingFn}
            handleBeforeInput={this.handleBeforeInput}
            handleKeyCommand={this.handleKeyCommand}
            // handleReturn={this.handleReturn}
            onChange={this.onChange}
            placeholder="Start your adventure..."
            plugins={plugins}
            readOnly={!this.state.editEnabled}
            ref="editor"
            spellCheck={true}
          />
        </div>
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
        />
        <button onClick={this.toggleEdit}>Toggle Edit</button>
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
