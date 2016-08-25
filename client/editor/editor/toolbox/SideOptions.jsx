import React, { Component } from 'react';
import { BLOCK_TYPES } from '../util/constants';


const popoverSpacing = 3 // The distance above the selection that popover 
  // will display

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: -24 - popoverSpacing,
    width: 24 * 6,
    height: 24 + popoverSpacing,
    zIndex: 998,
    // border: '1px solid black',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    //border: '1px solid rgba(204, 204, 204, 0.5);',
    borderRadius: 5,
    height: 24,
  },
  iconContainer: {
    display: 'inline-block',
    height: 24,
    width: 24,
    border: '1px solid black',
  },
}

        // <SideOptions
        //   style={Object.assign({}, {display: toolbarVisible ? 'block' : 'none'})}
        //   toggleBlockType={toggleBlockType}
        //   activeBlock={activeBlock}
        // />

export default class SideOptions extends Component {
  constructor(props){
    super(props);
  }

  toggleBlockType(blockType) {
    if (this.props.toggleBlockType){
      this.props.toggleBlockType(blockType);
    }
  }

  render() {
    return (
      <div style={Object.assign({}, styles.container, this.props.style)}>
        <div style={Object.assign({}, styles.innerContainer)}>


        </div>
      </div>
    );
  }
}
