import React from 'react';
import { BLOCK_ICON } from '../util/constants';
import SideOptions from './SideOptions.jsx';

const styles = {
  container: {
    position: 'absolute',
    zIndex: 999,
    margin: 0,
  },
};

export default class SideControl extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      toolbarVisible: false,
      activeBlock: 'unstyled',
      color: '#d3d3d3',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      activeBlock: props.selectedBlockType,
    })
  }

  render() {
    const { color } = this.state;
    const style = {
      display: 'inline-block',
      cursor: 'pointer',
      color,
      margin: 0,
    };
    const { activeBlock, toolbarVisible } = this.state;
    let className = BLOCK_ICON[activeBlock];
    let icon;
    if (className === 'H1' || className === 'H2' || className === 'H3') {
      icon = <h5 className={className} style={style}>{className}</h5>
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
            color: '#5ebe9e',
          })
        }}
        onMouseOut={(e) => {
          this.setState({
            toolbarVisible: false,
            color: '#d3d3d3',
          })
        }} >
        {icon}
        <SideOptions
          style={Object.assign({}, {display: toolbarVisible ? 'block' : 'none'})}
          toggleBlockType={this.props.toggleBlockType}
          activeBlock={activeBlock}
        />
      </div>
    );
  }
}
