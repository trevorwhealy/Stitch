import React from 'react';
import { findUser } from '../actions/ShareActions.jsx';


export default class ShareContent extends React.Component {

  constructor(props) {
    super(props);

    this.shareContent = this.shareContent.bind(this);
  }

  shareContent(e) {
    e.preventDefault();
    const shareTarget = this.inputEl.value;
    if (shareTarget.length) {
      findUser(this.props, shareTarget);
      $('#shareContentModal').closeModal();
      this.inputEl.value = '';
    }
  }

  closeShareModal() {
    $('#shareContentModal').closeModal();
  }

  render() {
    const { name } = this.props.content;

    if (name && this.inputEl) {
      setTimeout(() => this.inputEl.focus(), 500);
    }

    return (
      <form id="shareContentModal" className="modal" onSubmit={this.shareContent}>
        <div className="modal-content">
          <h5>Share content</h5>
          <div className="subtitle">
            With whom would you like to share, <b><em>{name}</em></b>
          </div>
          <input
            id="shareContentInput" className="validate"
            type="email" placeholder="Enter email address"
            ref={c => { this.inputEl = c; }}
          />
        </div>
        <div className="modalActions">
          <button onClick={this.closeShareModal} className="waves-effect btn-flat cancelBtn">
            CANCEL
          </button>
          <button className="waves-effect btn-flat actionBtn" type="submit">
            SHARE
          </button>
        </div>
      </form>
    );
  }
}

ShareContent.propTypes = {
  content: React.PropTypes.object,
  searchActions: React.PropTypes.object,
};
