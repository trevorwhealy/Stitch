import React from 'react';
import ReactDOM from 'react-dom';
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
  CompositeDecorator,
  getVisibleSelectionRect,
} from 'draft-js';

import Editor from 'draft-js-plugins-editor';
import SideControl from './editor/toolbox/SideControl.jsx';
import { fromJS } from 'immutable';
import { getSelectedBlockElement, getSelectionRange } from './editor/util/selection.js';

import CodeUtils from 'draft-js-code'; 

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import { StringToTypeMap, BREAKOUT, CODE_REGEX } from './editor/util/constants';
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


const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  INLINE_CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  HIGHLIGHT: {
    backgroundColor: '#7fffd4',
  }
};

const HASHTAG_REGEX = /\`(.*?)\`/g;

const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    minHeight: 40,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  sideControl: {
    //width: 48, // Needed to figure out how much to offset the sideControl left
    left: -48,
    display: 'none',
  },
  hashtag: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const iconSelectedColor = '#2000FF';
const iconColor = '#000000';

function hashtagStrategy(contentBlock, callback) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HashtagSpan = (props) => {
  return <span {...props} style={styles.hashtag}>{props.children}</span>;
};

const customDecorator = [
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
];

class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      editEnabled: true,
      suggestions: fromJS([]),
      editorBounds: null,
      sideControlVisible: false,
      sideControlTop: 50,
      sideControlLeft: 50,
    };

    console.log(this.state);
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
    this.toggleEdit = this.toggleEdit.bind(this);
    this.logState = () => {console.log(convertToRaw(this.state.editorState.getCurrentContent()), ' entitymap');
                           console.log(this.state.editorState.toJS());
                           console.log(this.state.editorState.getSelection());
                           console.log(this.state.suggestions);
                          }
    this.updateSelection = this.updateSelection.bind(this);
    this.blockRendererFn = blockRendererFn(this.onChange, this.getEditorState);
    //this.updateContents = this.updateContents.bind(this);
  }

  componentWillReceiveProps(props) {
    const { editorState } = this.state;
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
    setTimeout(this.updateSelection, 100);
  }

  focus() {
    const { editorBounds } = this.state;
    if ( !editorBounds ) {
      console.log(this.refs.editor);
      const editorNode = ReactDOM.findDOMNode(this.refs.editor);

      const editorBounds = editorNode.getBoundingClientRect();
      this.setState({
        editorBounds: editorBounds,
      });
    }

    this.refs.editor.focus();
    setTimeout(this.updateSelection, 100);
  }

  onChange(editorState){
    this.setState({ editorState });
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const users = blockMap.reduce(this.findMentionEntities, []);

    this.props.commentActions.postMention(this.props.note.id, users);
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.noteActions.saveNote(this.props.note.id, this.props.note.name, content);

    setTimeout(this.updateSelection, 5);
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
      if (e.keyCode === 53) {
        console.log('strike');
        return 'toggleinline:STRIKETHROUGH';
      }
      if (e.keyCode === 72) {
        console.log('sts');
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

  updateSelection() {
    const { editorBounds, editorState } = this.state;
    console.log(editorBounds, ' editorBounds');
    // let selectionRangeIsCollapsed = null;
    let sideControlVisible = false;
    let sideControlTop = null;
    let topAdj = 0;
    const sideControlLeft = styles.sideControl.left;
    // let popoverControlVisible = false,
    // let popoverControlTop = null,
    // let popoverControlLeft = null

    const selectionRange = getSelectionRange();
    if (selectionRange) {
      console.log('first if ', selectionRange);
      // const rangeBounds = selectionRange.getBoundingClientRect();
      const selectedBlock = getSelectedBlockElement(selectionRange);
      console.log('selected ', selectedBlock);

      if (selectedBlock) {
        const blockBounds = selectedBlock.getBoundingClientRect();

        sideControlVisible = true;
        //sideControlTop = this.state.selectedBlock.offsetTop
        if (!editorBounds) { return; }

        const contentState = editorState.getCurrentContent();
        const firstBlockType = contentState.getFirstBlock().getType();

        if (firstBlockType === 'header-one' || firstBlockType === 'header-two' || firstBlockType === 'header-three') {
          topAdj = 0;
        }

        sideControlTop = (blockBounds.top - editorBounds.top + window.pageYOffset) 
          + ((blockBounds.bottom - blockBounds.top) / 2) - 15 + topAdj;
                  console.log(editorBounds.top, 'editorBoundsTop');
                  console.log('sideControlTop ', sideControlTop);
                  console.log('blockBounds', blockBounds);

        // if (!selectionRange.collapsed){

        //   var popoverControlElement = ReactDOM.findDOMNode(this.refs["popoverControl"])
        //   // The control needs to be visible so that we can get it's width
        //   popoverControlElement.style.display = 'block'
        //   var popoverWidth = popoverControlElement.clientWidth

        //   popoverControlVisible = true
        //   var rangeWidth = rangeBounds.right - rangeBounds.left,
        //     rangeHeight = rangeBounds.bottom - rangeBounds.top
        //   popoverControlTop = (rangeBounds.top - editorBounds.top)
        //     - styles.popOverControl.height
        //     - popoverSpacing
        //   popoverControlLeft = 0
        //     + (rangeBounds.left - editorBounds.left)
        //     + (rangeWidth / 2)
        //     - (/*styles.popOverControl.width*/ popoverWidth / 2)
          
        // }
      }
    }
    this.setState({
      sideControlVisible,
      sideControlTop,
      sideControlLeft,
      // popoverControlVisible,
      // popoverControlTop,
      // popoverControlLeft,
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

    const selection = editorState.getSelection();
    const selectedBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    console.log(selectedBlockType);

    let sideControlStyles = Object.assign({}, styles.sideControl);
    if ( sideControlVisible && editEnabled ) {
      sideControlStyles.display = 'block';
      sideControlStyles.top = sideControlTop;
      sideControlStyles.left = sideControlLeft;
    }

    return (
      <div className="RichEditor-root" onClick={this.focus}>
        <SideControl
          style={sideControlStyles}
          toggleBlockType={type => this.toggleBlockType(type)}
          selectedBlockType={selectedBlockType}
          iconSelectedColor={iconSelectedColor}
          iconColor={iconColor}
        />
        <div className={className} >
          <Editor
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={blockRenderMap}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={styleMap}
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

  
const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
  commentActions: bindActionCreators(commentActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(RichEditor);
