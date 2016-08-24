import Todo from '../blocks/Todo';
import PageBreak from '../blocks/PageBreak.jsx';

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
    case 'atomic': return {
      component: PageBreak,
      props: {
        onChange,
        getEditorState,
      }
    };
    default: return null;
  }
};

