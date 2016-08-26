import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { getSelectionRange } from '../util/selection';

export default class OutlineContent extends React.Component {
  constructor(props){
    super(props);
  
    this.jumpTo = this.jumpTo.bind(this);
  }

  jumpTo(){
    const { block } = this.props;
    const key = block.getKey();

    const target = `[data-offset-key='${key}-0-0']`;

    $('body').animate({
      scrollTop: $(target).offset().top },
      'fast');
  }

  render() {
    const { block } = this.props;
    const type = block.getType();
    const title = block.getText();
    let header;
    const styles = {
      textIndent: 0,
    }

    if (type === 'header-one') {
      header = <h6 onClick={this.jumpTo}>{title}</h6>
    } else {
      if (type === 'header-two') {
        styles.textIndent = '1.5em';
        header = <h6 onClick={this.jumpTo}>{`${title}`}</h6>;
      }
    }
    return (
      <div style={styles}>
        {header}
      </div>
    );

  }
}
