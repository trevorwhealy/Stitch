import React from 'react';
import moment from 'moment';

/* Compressed test data to single line; Meant to demonstrate the 'show more arrow' on a folder with greater than 6 notes */
const fakeNotes=[{title:"flexbox froggy",date:new Date},{title:"flexbox froggy",date:new Date},{title:"flexbox froggy",date:new Date},{title:"flexbox froggy",date:new Date},{title:"flexbox froggy",date:new Date},{title:"flexbox froggy",date:new Date},{title:"flexbox froggy",date:new Date}];

const FolderFiles = () => {
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
};

export default FolderFiles;
