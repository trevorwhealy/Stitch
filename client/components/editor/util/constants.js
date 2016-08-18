export const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'CODE', style: 'code-block'},
  {label: 'TODO', style: 'todo'},
];


export const INLINE_STYLES = [
  {label: 'BOLD', style: 'BOLD'},
  {label: 'ITALIC', style: 'ITALIC'},
  {label: 'UNDERLINE', style: 'UNDERLINE'},
  {label: 'STRIKETHROUGH', style: 'STRIKETHROUGH'},
];

export const StringToTypeMap = {
  '- ': 'unordered-list-item',
  '1.': 'order-list-item',
  '# ': 'header-one',
  '## ': 'header-two',
  '### ': 'header-three',
  '==': 'unstyled',
  '```': 'code-block',
  '[]': 'todo',
}

export default {
  BLOCK_TYPES,
  INLINE_STYLES,
};