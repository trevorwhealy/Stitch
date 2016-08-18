import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      isClicked: false,
    };
  }

  displayOverlay() {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  }

  searchInput(e) {
    this.setState({ searchInput: e.target.value });
  }

  render() {
    const fakeData = [
      {
        fileName: 'Physics',
        createdAt: 'June',
        fileType: 'Folder',
      },
      {
        fileName: 'Chemistry',
        createdAt: 'May',
        fileType: 'Folder',
      },
      {
        fileName: 'Gravity',
        createdAt: 'April',
        fileType: 'File',
      },
    ];

    let display;
    if (this.state.isClicked) {
      display = <div className="overlay">
                  <div className="overlay-navbar">
                    <div className="overlay-close" onClick={this.displayOverlay.bind(this)}>
                      <i className="material-icons closeButton">close</i>
                    </div>
                  </div>
                  <div className="overlay-responsive">
                    <div className="searchFileOrFolder">
                      <i className="material-icons searchIcon">search</i>
                      <div className="fileOrFolderChoice">
                        <div className="userSearchFile">
                          {'File'}
                        </div>
                        <div className="userSearchFolder">
                          {'Folder'}
                        </div>
                      </div>
                    </div>
                    <div className="searchAllInput">
                      <input className="userQuery" type="text" onChange={this.searchInput.bind(this)}/>
                    </div>
                  </div>
                  <div className="overlay-searchResults">
                    <div className="userQueryResults">
                      <div className="resultTypeAndFileName">

                      </div>
                      <div className="resultFileCreatedAt">

                      </div>
                    </div>
                    <div className="userQueryResults"></div>
                  </div>
                </div>
    } else {
      display = <div className="test" />
    }

    return (
      <div>
        <i className="material-icons searchButton" onClick={this.displayOverlay.bind(this)}>search</i>
        { display }
      </div>
    );
  }
}

export default Search;
