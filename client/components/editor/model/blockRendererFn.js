import Todo from '../blocks/todo';

export default (onChange, getEditorState) => (contentBlock) => {
  // console.log(editorState, onChange);
  const type = contentBlock.getType();
  switch (type) {
    case 'todo': return {
      component: Todo,
      props: {
        onChange,
        getEditorState,
      },
    };
    default: return null;
  }
}

