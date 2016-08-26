import { CODE_REGEX } from '../util/constants';
import React from 'react';

const style = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function CodeStrategy(contentBlock, callback) {
  findWithRegex(CODE_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const CodeSpan = (props) => {
  return <span {...props} style={style.CODE}>{props.children}</span>;
};

const customDecorator = [
  {
    strategy: CodeStrategy,
    component: CodeSpan,
  },
];

export default customDecorator;
