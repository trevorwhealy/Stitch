import React from 'react';
import { BLOCK_ICON } from '../util/constants';

class BlockButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      activeBlock: null,

    });

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    const { style, activeBlock } = this.props;
    let className = BLOCK_ICON[style];
    let icon;
    let color;

    const styles = {
      display: 'block',
      cursor: 'pointer',
      zIndex: 999,
      margin: 0,
      paddingBottom: '10px',
      color: '#d3d3d3',
    };

    if (className === 'H1' || className === 'H2' || className === 'H3') {
      icon = <h5 className={className} style={styles} onMouseDown={this.onToggle}>{className} </h5>;
    } else {
      icon = <i
        className={className}
        style={styles}
        onMouseDown={this.onToggle}
      />
    }

    return (
      <div>
      { icon }
      </div>
    );
  }
}

export default StyleButton;