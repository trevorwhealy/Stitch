import {
  AtomicBlockUtils,
  Entity,
} from 'draft-js';

export function insertCodeBlock(editorState) {
  const entityKey = Entity.create(
    'TOKEN',
    'IMMUTABLE',
    {content: examples[nextFormula]}
  );

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
