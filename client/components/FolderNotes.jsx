import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActionCreators from '../actions/NoteActions.jsx';

/* Compressed test data to single line; Meant to demonstrate the
   'show more arrow' on a folder with greater than 6 notes */
// const fakeNotes=[{title:"flexbox froggy",date:new Date},
// { title:"flexbox froggy",date:new Date },{ title:"flexbox froggy",date:new Date },
// { title:"flexbox froggy",date:new Date },{ title:"flexbox froggy",date:new Date },
// { title:"flexbox froggy",date:new Date },{ title:"flexbox froggy",date:new Date } ];

class FolderNotes extends React.Component {

  componentWillMount() {
  }

  render() {
    return (
      <div className="folderFiles">
        <div className="title">{'Folder Name'}</div>
        <div className="number">{`${fakeNotes.length} notes found`}</div>
        <div className="notes"> {fakeNotes.map(note => {
          return (
            <div className="note">
              <div className="details">
                <div className="name">{note.title}</div>
                <div className="date">{moment().startOf(note.date).fromNow()}</div>
              </div>
              <div className="open">{'OPEN'}</div>
            </div>
          );
        })}
        </div>
        {
          fakeNotes.length > 6 ?
            <div className="prompt">
              <div>{'Scroll for more'}</div>
              <div><i className="material-icons">keyboard_arrow_down</i></div>
            </div>
          : ''
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteActions: bindActionCreators(noteActionCreators, dispatch),
});

// const mapStateToProps = (state) => {
//   return {
//
//   }
// }

export default connect(
  null,
  mapDispatchToProps
)(FolderNotes);
