import React from 'react';
import { findUser } from '../../actions/SearchActions.jsx';


export default class ShareContent extends React.Component {

  constructor(props) {
    super(props);

    this.shareContent = this.shareContent.bind(this);
    this.keyTracking = this.keyTracking.bind(this);
  }

  keyTracking(e) {
    if (e.keyCode === 13) {
      this.shareContent();
    }
  }

  shareContent() {
    const shareTarget = $('#shareContentInput').val();

    if (shareTarget.length) {
      console.log(this.props);
      findUser(this.props, shareTarget);
      $('#shareContentModal').closeModal();
      $('#shareContentInput').val('');
    }
  }

  closeShareModal() {
    $('#shareContentModal').closeModal();
  }

  render() {
    return (
      <div id="shareContentModal" className="modal">
        <center>
          <div className="modal-content">
            <h5> With whom would you like to share, </h5>
            <h5><b>{this.props.content.name}</b></h5>
            <input
              id="shareContentInput"
              style={{ textAlign: 'center', fontSize: '1.7em', padding: '5px' }}
              type="text" placeholder="type email here"
              onKeyDown={this.keyTracking}
            />
          </div>
        </center>
        <div className="cancelDelete">
          <button
            onClick={this.closeShareModal}
            className="waves-effect waves-gray btn-flat cancel"
          >
          CANCEL
          </button>
          <button
            onClick={this.shareContent}
            className="waves-effect waves-purple btn-flat delete"
          >
            Share
          </button>
        </div>
      </div>
    );
  }
}

ShareContent.propTypes = {
  content: React.PropTypes.string,
  searchActions: React.PropTypes.object,
};
