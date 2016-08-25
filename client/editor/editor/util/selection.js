export const getSelectedBlockElement = (range) => {
  let node = range.startContainer;
  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node;
    }
    node = node.parentNode;
  } while (node != null);
  return null;
  /*const currentContent = this.state.editorState.getCurrentContent()
  const selection = this.state.editorState.getSelection()
  return currentContent.getBlockForKey(selection.getStartKey())*/
};

export const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  return selection.getRangeAt(0);
};
