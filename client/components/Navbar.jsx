import React from 'react';
import UserChip from './UserChip.jsx';

const userName = 'AJ Yang';

const folders = ['chemistry', 'biology', 'java', 'c#', 'python', 'a', 'b', 'c', 'd', 'e', 'chemistry', 'biology', 'java', 'c#', 'python', 'a', 'b', 'c', 'd'];


const Navbar = () => (
  <div>

    <ul id="slide-out" className="side-nav">
      {/* User Includes userPhoto, userName, and userLogout */}
      <div className="user">
        <img className="circle" src='/assets/images/sunnyv.jpg' width="35" height="35"/>
        <div className="name">{'Sunny V'}</div>
        <i className="material-icons alert">power_settings_new</i>
      </div>

      {/* Search is the search bar at the bottom of the page */}
      <div className="search">
        <input className="query" type="text" placeholder="Search notes by Name or Tag"/>
      </div>

      {/*  createFolder includes title and create button */}
      <div className="createFolder">
        <div className="title"> FOLDERS </div>
        <div className="add">NEW<i className="tiny material-icons alert">add</i></div>
      </div>

      {/* folderNames includes the names of the folders */}
      <div className="folderNames">
        {folders.map(folder => {
          // TODO: decide how many folders we want to display - most recent 5? all of them?
          return (
            <div className="folder">
              {folder}
            </div>
          );
        })}
      </div>

    </ul>
    <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
  </div>
);

export default Navbar;
