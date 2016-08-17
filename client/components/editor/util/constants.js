export const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'CODE', style: 'code-block'},
];


export const INLINE_STYLES = [
  {label: 'BOLD', style: 'BOLD'},
  {label: 'ITALIC', style: 'ITALIC'},
  {label: 'UNDERLINE', style: 'UNDERLINE'},
  {label: 'STRIKETHROUGH', style: 'STRIKETHROUGH'},
];

export const StringToTypeMap = {
  '- ': Block.UL,
  '1.': Block.OL,
  '# ': Block.H1,
  '##': Block.H2,
  '==': Block.UNSTYLED,
  '[]': Block.TODO,
}

export default {
  BLOCK_TYPES,
  INLINE_STYLES,
};