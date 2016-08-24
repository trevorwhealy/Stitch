import StringToTypeMap from '../util/constants';
import { getCurrentBlock, resetBlockWithType, insertPageBreak } from './index';

export default (editorState, str, onChange, mapping = StringToTypeMap) => {
  const selection = editorState.getSelection();
  const block = getCurrentBlock(editorState);
  
  if (selection.getAnchorOffset() > 3) {
    return false;
  }
  const blockTo = mapping[block.getText() + str];

  if (!blockTo) {
    return false;
  }
  const finalType = blockTo.split(':');

  const fType = finalType[0];
  if ( fType === '---' ) {
    insertPageBreak(editorState);
    return true;
  }
  onChange(resetBlockWithType(editorState, fType));
  return true;
};
