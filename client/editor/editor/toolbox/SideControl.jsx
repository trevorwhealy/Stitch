import React from 'react';
import { BLOCK_ICON } from '../util/constants';
import SideOptions from './SideOptions.jsx'

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999,
    margin: 0,
    width: 30,
    display: 'block',
  },
};

export default class SideControl extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      toolbarVisible: false,
      activeBlock: 'unstyled',
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      activeBlock: props.selectedBlockType,
    })
  }

  render() {
    const style = {
      display: 'inline-block',
      cursor: 'pointer',
      color: '#d3d3d3',
    };
    const { activeBlock, toggleBlockType, toolbarVisible } = this.state;
    let className = BLOCK_ICON[activeBlock];
    let icon;
    if (className === 'H1' || className === 'H2' || className === 'H3') {
      icon = <span className={className} style={style}>{className}</span>
    } else {
      icon = <i
        className={className}
        style={style}
      />
    }

    return (

      <div style={Object.assign({}, styles.container, this.props.style)}
        onMouseOver={(e) => {
          this.setState({
            toolbarVisible: true,
          })
        }}
        onMouseOut={(e) => {
          this.setState({
            toolbarVisible: false,
          })
        }} >
        {icon}
        <SideOptions
          style={Object.assign({}, {display: toolbarVisible ? 'block' : 'none'})}
          toggleBlockType={toggleBlockType}
          activeBlock={activeBlock}
        />
      </div>
    );
  }
}
