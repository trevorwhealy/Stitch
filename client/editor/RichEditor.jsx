import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS } from 'immutable';
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
  Entity,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import {
  defaultSuggestionsFilter,
  plugins,
  MentionSuggestions,
} from './editor/util/plugins';

import CodeUtils from 'draft-js-code';

import * as noteActionCreators from '../notes/actions/NoteActions.jsx';
import * as commentActionCreators from '../comments/actions/CommentActions.jsx';


import Outline from './editor/toolbox/Outline.jsx';
import SideControl from './editor/toolbox/SideControl.jsx';

import { getSelectedBlockElement, getSelectionRange } from './editor/util/selection.js';
import { StringToTypeMap, Breakout, customStyleMap } from './editor/util/constants';
import beforeInput from './editor/model/beforeInput';
import blockRenderMap from './editor/model/blockRenderMap.jsx';
import blockRendererFn from './editor/model/blockRendererFn';

import customDecorator from './editor/model/customDecorator.jsx';
import { insertPageBreak, addBlock } from './editor/model/index';

import compiler from './compiler/compiler.js';


const styles = {
  sideControl: {
    left: -48,
    display: 'none',
  },
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      editEnabled: false,
      suggestions: fromJS([]),
      editorBounds: null,
      sideControlVisible: false,
      sideControlTop: 50,
      sideControlLeft: 50,
    };

    this.focus = this.focus.bind(this);
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
    // this.toggleEdit = this.toggleEdit.bind(this);
    this.logState = () => {console.log(convertToRaw(this.state.editorState.getCurrentContent()), ' entitymap');
                           console.log(this.state.editorState.toJS());
                           console.log(this.state.editorState.getSelection());
                           console.log(this.state.suggestions);
                          }
    this.updateSelection = this.updateSelection.bind(this);
    this.blockRendererFn = blockRendererFn(this.onChange, this.getEditorState);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(props) {
    const { editorState } = this.state;

    if (props.user.id === props.note.userId) {
      this.setState({
        editEnabled: true,
      });
      this.saveInterval = setInterval(this.save, 3000);
      setTimeout(this.updateSelection, 100);
    }

    if (props.note.shares && props.note.content) {
      const mentions = fromJS(props.note.shares.map((share) => ({
        name: share.user.fullName,
        avatar: share.user.photo,
        id: share.userId,
      })));
      this.setState({
        editorState: EditorState.push(editorState, convertFromRaw(props.note.content)),
        suggestions: mentions,
      });
    } else if (!props.note.shares && props.note.content) {
      this.setState({
        editorState: EditorState.push(editorState, convertFromRaw(props.note.content)),
      });
    } else if (props.note.shares && !props.note.content) {
      const mentions = fromJS(props.note.shares.map((share) => ({
        name: share.user.fullName,
        avatar: share.user.photo,
        id: share.userId,
      })));
      this.setState({
        suggestions: mentions,
      });
    }

  }

  componentWillUnmount() {
    clearInterval(this.saveInterval);
  }

  focus() {
    let { editorBounds } = this.state;
    if (!editorBounds) {
      const editorNode = ReactDOM.findDOMNode(this.refs.editor);
      editorBounds = editorNode.getBoundingClientRect();
      this.setState({
        editorBounds,
      });
    }
    this.refs.editor.focus();
    setTimeout(this.updateSelection, 100);
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'todo': return 'block-todo';
      default: return null;
    }
  }

  onChange(editorState) {
    this.setState({ editorState });

    setTimeout(this.updateSelection, 5);
  }

  save() {
    const { editorState } = this.state;
    if (this.props.note) {
      const { id, name } = this.props.note;
      const contentState = editorState.getCurrentContent();
      const blockMap = contentState.getBlockMap();
      const users = blockMap.reduce(this.findMentionEntities, []);
      const content = convertToRaw(editorState.getCurrentContent());
      
      this.props.commentActions.postMention(id, users);
      this.props.noteActions.saveNote(id, name, content);
      window.localStorage['editor' + id] = JSON.stringify(content);
    }
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

  keyBindingFn(e) {
    if (e.ctrlKey) {
      if (e.keyCode === 83) {
        return 'editor-save';
      }
      if (e.altKey) {
        if (e.keyCode === 67) {
          return 'compile';
        }
      }
      if (e.keyCode === 53) {
        return 'toggleinline:STRIKETHROUGH';
      }
      if (e.keyCode === 72) {
        return 'toggleinline:HIGHLIGHT';
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
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    if (CodeUtils.hasSelectionInBlock(editorState) || currentBlockType === 'blockquote') {
      this.onChange(
        CodeUtils.handleReturn(e, editorState)
      );
      return true;
    }

    if (Breakout.indexOf(currentBlockType) !== -1) {
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

    if (command.indexOf('toggleinline:') === 0) {
      const inline = command.split(':')[1];
      this.toggleInlineStyle(inline);
      console.log('toggle');
      return true;
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onSearchChange({ value }) {
    const { suggestions } = this.state;
    this.setState({
      suggestions: defaultSuggestionsFilter(value, suggestions),
    });
  }

  onEscape() {
    const { editorState } = this.state;
    if (CodeUtils.hasSelectionInBlock(editorState) || RichUtils.getCurrentBlockType(editorState) === 'blockquote') {
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

  updateSelection() {
    const { editorBounds, editorState } = this.state;

    let sideControlVisible = false;
    let sideControlTop = null;

    const sideControlLeft = styles.sideControl.left;

    const selectionRange = getSelectionRange();
    if (selectionRange) {
      const selectedBlock = getSelectedBlockElement(selectionRange);

      if (selectedBlock) {
        const blockBounds = selectedBlock.getBoundingClientRect();
        sideControlVisible = true;

        if (!editorBounds) { return; }

        const contentState = editorState.getCurrentContent();

        sideControlTop = (blockBounds.top - editorBounds.top + window.pageYOffset) 
          + ((blockBounds.bottom - blockBounds.top) / 2) - 15;
      }
    }
    this.setState({
      sideControlVisible,
      sideControlTop,
      sideControlLeft,

    });
  }

  render() {
    const { editorState, sideControlVisible, editEnabled, sideControlTop, sideControlLeft } = this.state;

    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const selectedBlockType = RichUtils.getCurrentBlockType(editorState);

    let sideControlStyles = Object.assign({}, styles.sideControl);
    if ( sideControlVisible && editEnabled ) {
      sideControlStyles.display = 'block';
      sideControlStyles.top = sideControlTop;
      sideControlStyles.left = sideControlLeft;
    }

    return (
      <div className="RichEditor-root" onClick={this.focus}>
        <Outline
          editorState={editorState}
        />
        <SideControl
          style={sideControlStyles}
          toggleBlockType={type => this.toggleBlockType(type)}
          selectedBlockType={selectedBlockType}
        />
        <div className={className} >
          <Editor
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={blockRenderMap}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={customStyleMap}
            decorators={customDecorator}
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
        {/*<button onClick={this.toggleEdit}>Toggle Edit</button>
        <input
          onClick={this.logState}
          type="button"
          value="Log State"
        />*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
  commentActions: bindActionCreators(commentActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichEditor);
