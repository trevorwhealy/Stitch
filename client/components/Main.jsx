import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getAllFolders } from '../actions/FolderActions.jsx';
import * as noteActionCreators from '../actions/NoteActions.jsx';
import * as folderActionCreators from '../actions/FolderActions.jsx';

class Main extends React.Component {
  componentWillMount() {
    this.props.noteActions.getAllNotes();
    this.props.folderActions.getAllFolders();
  }

  render() {
    const notes = this.props.notes.note;
    const folders = this.props.folders.folder;
    let recentNotes;

    if (notes) {
      recentNotes =
        notes.map(note => {
          return (
            <div className="note">
              <div className="top">{''}</div>
              <div className="bottom">
                <div className="noteTitle">
                  {note.name}
                </div>
                <div className="noteDetails">
                  {`Updated at ${note.updatedAt.slice(0, 10)}`}
                </div>
              </div>
            </div>
          );
        });
      }

    return (
      <div className="MainContainer">
        <div className="recent">
          <div className="title"> {'RECENT NOTES'} </div>
          <div className="notes">
            {recentNotes}
          </div>
        </div>

        <div className="folderContainer">
          <div className="folderHeader">
            <div>{'Folders'}</div>
            <div className="add">
              <i className="material-icons">add</i>
              <div className="addFolder">{'NEW FOLDER'}</div>
            </div>
          </div>
          <div className="folders">
            {folders.map(folder => {
              return (
                <div className="eachFolder">
                  <div className="folderContents">
                    <i className="material-icons">folder</i>
                    <div className="content">
                      <div className="top">
                        {folder.name}
                        {folder.shared ? 'shared' : ''}
                      </div>
                      <div className="bottom">
                        {`${3} notes`}
                        &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                        {`Created by ${folder.user.fullName}`}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="elipses">
                      <i className="material-icons">more_vert</i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  folderActions: bindActionCreators(folderActionCreators, dispatch),
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
    notes: state.notes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

Main.propTypes = {
  folderActions: React.PropTypes.object,
  noteActions: React.PropTypes.object,
  folders: React.PropTypes.object,
  notes: React.PropTypes.object,
};
