import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as folderActionCreators from '../../actions/FolderActions.jsx';

class AddFolder extends React.Component {

  constructor() {
    super();
    this.addFolder = this.addFolder.bind(this);
  }

  addFolder(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        this.props.folderActions.createFolder(e.target.value);
        e.target.value = '';
        $('#addFolderModal').closeModal();
      }
    }
  }

  render() {
    return (
      <div id="addFolderModal" className="modal">
        <div className="modal-content">
          <center>
            <h5 style={{ marginBottom: '20px' }}> Add a new folder </h5>
            <input
              style={{ textAlign: 'center', fontSize: '1.7em', padding: '5px' }}
              type="text"
              onKeyDown={this.addFolder}
            />
            <p style={{ fontSize: '.5em', color: 'gray' }}><i>Press Enter to Save</i></p>
          </center>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(AddFolder);

AddFolder.propTypes = {
  folderActions: React.PropTypes.object,
};
