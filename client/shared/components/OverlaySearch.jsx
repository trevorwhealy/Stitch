import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActionCreators from '../actions/SearchActions.jsx';
import OverlaySearchResults from './OverlaySearchResults.jsx';

class OverlaySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverLayClicked: false,
      isActive: false,
      choice: 'folder',
    };
    this.displayOverlay = this.displayOverlay.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.displayOverlay = this.displayOverlay.bind(this);
    this.userChoice = this.userChoice.bind(this);
  }

  componentDidMount() {
    $('.dropdown-buttonTwo').dropdown({});
  }

  displayOverlay() {
    this.setState({
      isOverLayClicked: !this.state.isOverLayClicked,
    });
  }

  searchInput(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        this.props.searchActions.globalSearch(this.state.choice, e.target.value);
        e.target.value = '';
      }
    }
  }

  userChoice(choice) {
    this.setState({
      choice,
    });
  }

  render() {
    let display;
    if (this.state.isOverLayClicked) {
      display = (
        <div className="overlay">
          <div className="overlay-navbar">
            <div className="overlay-close" onClick={this.displayOverlay}>
              <i className="material-icons closeButton">close</i>
            </div>
          </div>
          <div className="overlay-responsive">
            <div className="searchFileOrFolder">
              <i className="material-icons searchIcon">search</i>
              <div className="searchAllInput">
                <input className="userQuery" type="text" onKeyDown={this.searchInput} />
              </div>
              <div className="fileOrFolderChoice">
                <div className="fileOrFolderLabel">
                  {this.state.choice}
                </div>
                <button className="dropdown-btn contentType">
                  <i className="material-icons">keyboard_arrow_down</i>
                  <ul className="dropdown-menu">
                    <li onClick={() => this.userChoice('notes')}>notes</li>
                    <li onClick={() => this.userChoice('folders')}>folder</li>
                  </ul>
                </button>
              </div>
            </div>
          </div>
          <OverlaySearchResults toggleOverlay={this.displayOverlay} />
        </div>
      );
    } else {
      display = (<div />);
    }

    return (
      <a className="icon-btn">
        <i className="material-icons searchButton" onClick={this.displayOverlay}>search</i>
        { display }
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(OverlaySearch);

OverlaySearch.propTypes = {
  searchActions: React.PropTypes.object,
};
