import React from 'react';

/* Constant variables to test component render */
/* TODO: Replace the below test variables with relevant user state from redux */
const userFullName = 'Trevor';
const folders = ['chemistry', 'biology', 'java', 'c#', 'python', 'a', 'b', 'c', 'd'];

const Sidebar = () => (
  <div>
    <ul id="slide-out" className="side-nav">
      {/* User chip: userPhoto, userName, and userLogout */}
      <div className="user">
        <img
          className="circle"
          alt="profile"
          src="/assets/images/sunnyv.jpg"
          width="35" height="35"
        />
        <div className="name">{userFullName}</div>
        <i className="material-icons alert">power_settings_new</i>
      </div>

      {/* Searchbar */}
      <div className="search">
        <div className="left-inner-addon ">
          <i className="material-icons">search</i>
          <input className="query" type="text" placeholder="Search notes by Name or Tag" />
        </div>
      </div>

      {/*  Create Folder: title and create button */}
      <div className="createFolder">
        <div className="title"> FOLDERS </div>
        <div className="add">NEW<i className="tiny material-icons alert">add</i></div>
      </div>

      {/* Folder Names: names of folders */}
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

    {/* Actual button that will be clicked to open the sideNav */}
    <a href="#" data-activates="slide-out" className="button-collapse">
      <i className="material-icons">menu</i>
    </a>
  </div>
);

export default Sidebar;