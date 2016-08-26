export const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon: 'H1'},
  {label: 'H2', style: 'header-two', icon: 'H2'},
  {label: 'H3', style: 'header-three', icon: 'H3'},
  {label: 'Blockquote', style: 'blockquote', icon: 'fa fa-quote-left fa-2x'},
  {label: 'UL', style: 'unordered-list-item', icon: 'fa fa-list-ul fa-2x'},
  {label: 'OL', style: 'ordered-list-item', icon: 'fa fa-list-ol fa-2x'},
  {label: 'CODE', style: 'code-block', icon: 'fa fa-code fa-2x'},
  {label: 'TODO', style: 'todo', icon: 'fa fa-check-square-o fa-2x'},
  {label: 'PAGEBREAK', style: 'atomic', icon: 'fa fa-minus fa-2x'},
  {label: 'unstyled', style: 'unstyled', icon: 'fa fa-align-justify fa-2x'},
];

export const BLOCK_ICON = {
  'header-one': 'H1',
  'header-two': 'H2',
  'header-three': 'H3',
  blockquote: 'fa fa-quote-left fa-2x',
  'unordered-list-item': 'fa fa-list-ul fa-2x',
  'ordered-list-item': 'fa fa-list-ol fa-2x',
  'code-block': 'fa fa-code fa-2x',
  todo: 'fa fa-check-square-o fa-2x',
  atomic: 'fa fa-minus fa-2x',
  unstyled: 'fa fa-align-justify fa-2x',
};

export const Breakout = ['header-one', 'header-two', 'header-three'];

export const INLINE_STYLES = [
  {label: 'BOLD', style: 'BOLD'},
  {label: 'ITALIC', style: 'ITALIC'},
  {label: 'UNDERLINE', style: 'UNDERLINE'},
  {label: 'STRIKETHROUGH', style: 'STRIKETHROUGH'},
];

export const StringToTypeMap = {
  '- ': 'unordered-list-item',
  '1. ': 'ordered-list-item',
  '# ': 'header-one',
  '## ': 'header-two',
  '### ': 'header-three',
  '==': 'unstyled',
  '```': 'code-block',
  '[]': 'todo',
  '---': 'atomic',
};

export const CODE_REGEX = /\`(.*?)\`/g;

export const customStyleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  HIGHLIGHT: {
    backgroundColor: '#7fffd4',
  },
};


export default {
  BLOCK_TYPES,
  INLINE_STYLES,
  StringToTypeMap,
  Breakout,
  CODE_REGEX,
  BLOCK_ICON,
  customStyleMap,
};