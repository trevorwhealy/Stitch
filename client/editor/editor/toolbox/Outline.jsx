import React from 'react';
import OutlineContent from './OutlineContent.jsx';

export default class Outline extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    const { editorState } = this.props;
    const map = editorState.getCurrentContent().getBlockMap();

    const filterMap = map.filter((block) => {
      const type = block.getType();
      return type === 'header-one' || type === 'header-two';
    });
    return (
      <div className='Outline' >
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
