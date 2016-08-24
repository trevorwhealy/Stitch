import React from 'react';
// import { FocusDecorator } from 'draft-js-focus-plugin';
// import { AlignmentDecorator } from 'draft-js-alignment-plugin';
import { Modifier, EditorState } from 'draft-js';

export default class PageBreak extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.addBlock();
  }

  addBlock() {

    const { block, blockProps } = this.props;
    const { onChange, getEditorState } = blockProps;
    const contentState = getEditorState().getCurrentContent();
    const targetSelection = contentState.getSelectionAfter();
    const insertionTargetBlock = Modifier.splitBlock(contentState, targetSelection);
    const insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
    const newContentStateAfterSplit = Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, 'unstyled');

    const newState = EditorState.push(
      getEditorState(),
      newContentStateAfterSplit,
      'insert-fragment'
    );

    onChange(newState);

  }

  render() {
    const styles = {
      backgroundColor: 'rgba(98, 177, 254, 1.0)',
      width: '100%',
      height: '10px',
      textAlign: 'center',
      color: 'white',
      zIndex: 1,
      position: 'relative',
    };
    return (
      <div className="pagebreak" style={styles}> </div>
   );
  }

};


// export default FocusDecorator(
//   (AlignmentDecorator(PageBreak)
//   )
// );
