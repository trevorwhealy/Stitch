import React from 'react';
import OutlineContent from './OutlineContent.jsx';

export default class Outline extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    const style = {
      left: 20,
      position: 'fixed',
      display: 'inline-block',
      top: '50%',
      height: 400,
      width: 200,
      overflow: 'auto',
    };

    const { editorState } = this.props;
    const map = editorState.getCurrentContent().getBlockMap();

    const filterMap = map.filter((block) => {
      const type = block.getType();
      return type === 'header-one' || type === 'header-two';
    });
    return (
      <div style={style}>
        {filterMap.map(block => {
          return (
            <OutlineContent
              block={block}
            />
          );
        })}
      </div>
    );

  }
}
