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


export const getSelectionRect = (selected) => {
  let _rect = selected.getRangeAt(0).getBoundingClientRect();
  let rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];//selected.getRangeAt(0).getBoundingClientRect()
  if (!rect) {
    if(selected.anchorNode && selected.anchorNode.getBoundingClientRect){
      rect = selected.anchorNode.getBoundingClientRect();
      rect.isEmptyline = true;
    }
    else {
      return null;
    }
  }
  return rect;
}

export const getSelection = (root) => {
  let t = null;
  if (root.getSelection) {
    t = root.getSelection();
  } else if (root.document.getSelection) {
    t = root.document.getSelection();
  } else if (root.document.selection) {
    t = root.document.selection.createRange().text;
  }
  return t;
}