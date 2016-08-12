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
    ];

    const fakeFolders = [
      {
        folderName: 'My Folder A',
        createdBy: 'Trevor H.',
        count: 4,
        shared: true,
      },
      {
        folderName: 'My Folder A',
        createdBy: 'Trevor H.',
        count: 4,
        shared: false,
      },
      {
        folderName: 'My Folder A',
        createdBy: 'Trevor H.',
        count: 4,
        shared: false,
      },
    ];

    return (
      <div className="MainContainer">
        <div className="recent">
          <div className="title"> {'RECENT NOTES'} </div>
          <div className="notes">
            {fakeNotes.map(note => {
              return (
                <div className="note">
                  <div className="top">{''}</div>
                  <div className="bottom">
                    <div className="noteTitle">
                      {note.title}
                    </div>
                    <div className="noteDetails">
                      {note.updatedAt}
                    </div>
                  </div>
                </div>
              );
            })}
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
            {fakeFolders.map(folder => {
              return (
                <div className="eachFolder">
                  <div className="folderContents">
                    <i className="material-icons">folder</i>
                    <div className="content">
                      <div className="top">
                        {folder.folderName}
                        {folder.shared ? 'shared' : ''}
                      </div>
                      <div className="bottom">
                        {`${folder.count} notes`}
                        &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                        {`Created by ${folder.createdBy}`}
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


export default Main;
