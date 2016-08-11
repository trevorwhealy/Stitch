import React from 'react';

class Main extends React.Component {
  constructor() {
    super();
  }


  render() {
    const fakeNotes = [
      {
        title: 'My Note A',
        updatedAt: '1/11/16 11:11AM',
      },
      {
        title: 'My Note A',
        updatedAt: '1/11/16 11:11AM',
      },
      {
        title: 'My Note A',
        updatedAt: '1/11/16 11:11AM',
      },
      {
        title: 'My Note A',
        updatedAt: '1/11/16 11:11AM',
      },
      {
        title: 'My Note A',
        updatedAt: '1/11/16 11:11AM',
      },
    ];
    const fakeFolders = [
      {
        folderName: 'My Folder A',
        createdBy: 'Trevor Easy',
        count: 4,
      },
      {
        folderName: 'My Folder A',
        createdBy: 'Trevor Easy',
        count: 4,
      },
      {
        folderName: 'My Folder A',
        createdBy: 'Trevor Easy',
        count: 4,
      },
    ];

    return (
      <div className="MainContainer">
        <div className="recent">
          {'RECENT NOTES'}
          <div className="notes">
            {fakeNotes.map(note => {
              return (
                <div className="note">
                  {note.tile}
                  {note.updatedAt}
                </div>
              );
            })}
          </div>

        </div>

        <div className="folderContainer">
          <div className="folderHeader">
            <div>{'Folders'}</div>
            <div>{'Add Folder'}</div>
          </div>
          <div className="folders">
            {fakeFolders.map(folder => {
              return (
                <div className="folder">
                  {folder.folderName}
                  {folder.createdBy}
                  {folder.count}
                </div>
              );
            })}
          </div>
        </div>


      </div>


    );
  }
}


export default Main;
