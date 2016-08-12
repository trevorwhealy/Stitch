import React from 'react';
import RichEditor from './RichEditor.jsx';


class Page extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return(
      <div className="PageContainer">
        <div className="noteTitle">
          {'Biology Notes'}
        </div>
        <div className="editor">
          <RichEditor />
        </div>
      </div>
    );
  }
}

export default Page;
