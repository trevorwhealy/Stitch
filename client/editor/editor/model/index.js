import { EditorState, AtomicBlockUtils, Entity, Modifier } from 'draft-js';
import ReactDOM from 'react-dom';

export const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case 'todo': return { checked: false };
    default: return initialData;
  }
};

export const getCurrentBlock = (editorState) => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
};

export const resetBlockWithType = (editorState, newType = 'unstyled') => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);
  const newText = '';
  const newBlock = block.merge({
    text: newText,
    type: newType,
    data: getDefaultBlockData(newType),
  });
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

export const addBlock = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const targetSelection = editorState.getSelection();

  const insertionTargetBlock = Modifier.splitBlock(contentState, targetSelection);
  const insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
  const newContentStateAfterSplit = Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, 'unstyled');

  const newState = EditorState.push(
    editorState,
    newContentStateAfterSplit,
    'insert-fragment'
  );

  return newState;
};


export const updateDataOfBlock = (editorState, block, newData) => {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData,
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
  // return editorState;
};

export const insertPageBreak = (editorState) => {
  const entityKey = Entity.create(
    'PAGE-BREAK',
    'IMMUTABLE',
    { content: ' ' }
  );

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
};
