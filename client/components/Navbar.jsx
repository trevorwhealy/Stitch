import React from 'react';
import UserChip from './UserChip.jsx';

const userName = 'AJ Yang';

const folders = ['chemistry', 'biology', 'java', 'c#', 'python'];


const Navbar = () => (
  <div>
    <ul id="slide-out" className="side-nav">
      <div className="user">
        <img className="circle" src='/assets/images/sunnyv.jpg' width="30" height="30"/>
        <div className="name">{'Sunny V'}</div>
        <i className="material-icons alert">info</i>
      </div>

      <div className="folder">
        <div className="title"> FOLDERS </div>
        <div className="add">NEW<i className="material-icons alert">add</i></div>
        {folders.map(folder => {
          // TODO: decide how many folders we want to display - most recent 5? all of them?
          return (
            <div>
              {folder}
            </div>
          );
        })}
      </div>
      {'search'}

    </ul>
    <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
  </div>
);

export default Navbar;
