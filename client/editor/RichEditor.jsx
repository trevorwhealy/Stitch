import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import * as noteActionCreators from '../notes/actions/NoteActions.jsx';
import * as commentActionCreators from '../comments/actions/CommentActions.jsx';

import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  convertFromRaw,
  SelectionState,
  Entity,
} from 'draft-js';

import Editor from 'draft-js-plugins-editor';
import { fromJS } from 'immutable';

import CodeUtils from 'draft-js-code';

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import { StringToTypeMap, BREAKOUT } from './editor/util/constants';
import beforeInput from './editor/model/beforeInput';
import blockRenderMap from './editor/model/blockRenderMap.jsx';
import blockRendererFn from './editor/model/blockRendererFn';
import compiler from './compiler/compiler.js';
import { resetBlockWithType, insertPageBreak, addBlock } from './editor/model/index';

const { hasCommandModifier } = KeyBindingUtil;

const mentionPlugin = createMentionPlugin();
const linkifyPlugin = createLinkifyPlugin();

const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin, linkifyPlugin];

import {
  BlockStyleControls,
  InlineStyleControls,
} from './editor/toolbox/StyleControls.jsx';

class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      editEnabled: true,
      suggestions: fromJS([]),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.onEscape = this.onEscape.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.getEditorState = () => this.state.editorState;
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleBeforeInput = this.handleBeforeInput.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.logState = () => {console.log(convertToRaw(this.state.editorState.getCurrentContent()), ' entitymap');
                           console.log(this.state.editorState.toJS());
                           console.log(this.state.editorState.getSelection());
                           console.log(this.state.suggestions);
                          }
    this.blockRendererFn = blockRendererFn(this.onChange, this.getEditorState);
    //this.updateContents = this.updateContents.bind(this);
  }

  componentWillReceiveProps(props) {
    const { editorState } = this.state
    if (props.note.shares && props.note.content) {
      const mentions = fromJS(props.note.shares.map((share) => ({name: share.user.fullName, avatar: '/assets/images/sunnyv.jpg', id: share.userId})));
      this.setState({
      editorState: EditorState.push(editorState, convertFromRaw(props.note.content)),
      suggestions: mentions,
    })
  } else if (!props.note.shares && props.note.content) {
    this.setState({
      editorState: EditorState.push(editorState, convertFromRaw(props.note.content)),
    })
  } else if (props.note.shares && !props.note.content) {
    const mentions = fromJS(props.note.shares.map((share) => ({name: share.user.fullName, avatar: '/assets/images/sunnyv.jpg', id: share.userId})));
    this.setState({
      suggestions: mentions,
    })
  }
  }

  onChange(editorState){
    this.setState({ editorState });
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
    let command;

    if (e.ctrlKey) {
      if (e.keyCode ===  83 ) {
        return 'editor-save';
      }
      if (e.altKey) {
        if (e.keyCode === 67) {
          return 'compile';
        }
      }
    }
    return getDefaultKeyBinding(e);
  }

  handleBeforeInput(str) {
    const { editorState } = this.state;
    return beforeInput(editorState, str, this.onChange, StringToTypeMap);
  }

  handleReturn(e) {
    const { editorState } = this.state;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      this.onChange(
        CodeUtils.handleReturn(e, editorState)
      );
      return true;
    }

    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    if (BREAKOUT.indexOf(currentBlockType) !== -1) {
      this.onChange(addBlock(editorState));
      return true;
    }
    return;
  }

  handleTab(e) {
    const { editorState } = this.state;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      this.onChange(
        CodeUtils.handleTab(e, editorState)
      );
      return true;
    }
    const newEditorState = RichUtils.onTab(e, editorState, 2);
    if (newEditorState !== editorState) {
      this.onChange(newEditorState);
    }
    return;
  }

  findMentionEntities(users, block) {
    let entityKey;
    block.findEntityRanges(
      (character) => {
        entityKey = character.getEntity();
        return entityKey !== null && Entity.get(entityKey).getType() === 'mention';
      },
      () => {
        const data = Entity.get(entityKey).getData();
        if (!data.notified) {
          Entity.mergeData(entityKey, { notified: true });
          users.push(data.mention.get('id'));
        }
      });
    return users;
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
    if (command === 'editor-save') {
      const blockMap = contentState.getBlockMap();
      const users = blockMap.reduce(this.findMentionEntities, []);

      this.props.commentActions.postMention(this.props.note.id, users);
      const content = convertToRaw(this.state.editorState.getCurrentContent());
      this.props.noteActions.saveNote(this.props.note.id, this.props.note.name, content);
      return true;
    }

    if (command === 'compile') {
      const answer = $(document.getSelection().focusNode).closest('.public-DraftStyleDefault-pre').text();
      const lang = document.getElementById('language').value;

      console.log(lang);

      compiler(answer, lang)
      .then(res => res.json())
      .then(data => {
        const $compilesRemaining = $('.compilesRemaining').first();
        $compilesRemaining.text(`${data.compiles} Compiles Remaining`);

        if (data.message === 'Compile limit exceeded') {
          return Promise.reject('Compile limit exceeded');
        }
        const $p = $(`<p> ${data.stdout} </p>`);
        const $answer = $('.compileAnswer');

        $answer.append($p);
        console.log($p.position(), $p.height(), $p.offset());
        $answer.animate({ scrollTop: $p.position().top + $p.height() }, 250);
      })
      .catch(err => {
        switch (err) {
          case 'no code typed':
            break;
          case 'no lang selected':
            const languageDropdown = $('.compilerContainer').find('.select-dropdown');

            languageDropdown.addClass("pickLanguage").delay(1000).queue(function(){
              $(this).removeClass("pickLanguage").dequeue();
            });
            break;
          case 'Compile limit exceeded':
            const $compilesRemaining = $('.compilesRemaining').first();
            $compilesRemaining.text('Compile Limit Reached');
            $compilesRemaining.addClass("pickLanguage").delay(1000).queue(function(){
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

  onSearchChange({ value }){
    const { suggestions } = this.state;
    this.setState({
      suggestions: defaultSuggestionsFilter(value, suggestions),
    });
  }

  onEscape(){
    const { editorState } = this.state;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      this.onChange(addBlock(editorState));
      return;
    }
    return;
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
            handleReturn={this.handleReturn}
            onChange={this.onChange}
            onEscape={this.onEscape}
            onTab={this.handleTab}
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

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
  commentActions: bindActionCreators(commentActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(RichEditor);