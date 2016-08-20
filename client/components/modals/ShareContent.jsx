import React from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { findUser } from '../../actions/SearchActions.jsx';


export default class ShareContent extends React.Component {

  constructor(props) {
    super(props);

    this.shareContent = this.shareContent.bind(this);
  }

  shareContent(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        findUser(this.props.content, e.target.value);
        e.target.value = '';
        $('#shareContentModal').closeModal();
      }
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
              style={{ textAlign: 'center', fontSize: '1.7em', padding: '5px' }}
              type="text" placeholder="type email here"
              onKeyDown={this.shareContent}
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
            className="waves-effect waves-red btn-flat delete"
          >
            Share
          </button>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   searchActions: bindActionCreators(searchActionCreators, dispatch),
// });
//
// export default connect(
//   null,
//   null,
// )(ShareContent);

ShareContent.propTypes = {
  content: React.PropTypes.object,
  searchActions: React.PropTypes.object,
};
