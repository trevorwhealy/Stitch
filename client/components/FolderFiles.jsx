import React from 'react';

class FolderFiles extends React.Component {
  constructor() {
    super();
  }

  const fakeNotes = [


  ];

  render() {
    return (
      <div className="folderFiles">
        <div className="title">Folder Name</div>
        <div className="number">Number of notes</div>
        <div className="notes"> {fakeNotes.map(note => {
            // any additional logic
            return (

            );
          })}
        </div>
      </div>
    );
  }
}


export default FolderFiles;
