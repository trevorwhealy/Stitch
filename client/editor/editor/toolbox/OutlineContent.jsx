import React from 'react';

export default class OutlineContent extends React.Component {
  constructor(props) {
    super(props);
    this.jumpTo = this.jumpTo.bind(this);
  }

  jumpTo() {
    const { block } = this.props;
    const key = block.getKey();
    const $target = $(`[data-offset-key='${key}-0-0']:first`);
    const scrollTop = $target[0] ? $target[0].offsetTop : 0;

    $('.pageWrapper').animate({ scrollTop }, 'fast');
  }

  render() {
    const { block } = this.props;
    const type = block.getType();
    const title = block.getText();
    let header;

    const styles = {
      div: { textIndent: 0 },
      head: { fontWeight: 'bold', fontFamily: 'Avenir, Helvetica' },
    };

    if (type === 'header-one') {
      header = (<h6 onClick={this.jumpTo}><b>{title}</b></h6>);
    } else if (type === 'header-two') {
      styles.div.textIndent = '1.5em';
      header = <h6 onClick={this.jumpTo}>{`${title}`}</h6>;
    }
    return (
      <div style={styles.div}>
        {header}
      </div>
    );
  }
}

OutlineContent.propTypes = {
  block: React.PropTypes.object,
};
