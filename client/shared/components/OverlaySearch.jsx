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
      choice: 'notes',
    };
    this.displayOverlay = this.displayOverlay.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.displayOverlay = this.displayOverlay.bind(this);
    this.userChoice = this.userChoice.bind(this);
  }

  componentDidUpdate() {
    if (this.dropdownEl) {
      $(this.dropdownEl).dropdown();
    }
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
        <div className="pageWrapper overlay">
          <div className="overlay-navbar">
            <div className="overlay-close" onClick={this.displayOverlay}>
              <i className="material-icons closeButton">close</i>
              <span>close</span>
            </div>
          </div>
          <div className="overlay-responsive">
            <div className="searchbox">
              <i className="material-icons searchIcon">search</i>
              <input
                className="userQuery" type="text" placeholder="I'm looking for..."
                onKeyDown={this.searchInput}
              />
              <a
                className="dropdown-button btn btn-flat searchDropdown"
                data-activates="searchTypeDropdown"
                ref={c => { this.dropdownEl = c; }}
              >
                <span>{this.state.choice}</span>
                <i className="material-icons">keyboard_arrow_down</i>
              </a>
              <ul id="searchTypeDropdown" className="dropdown-content">
                <li><a onClick={() => this.userChoice('notes')}>Notes</a></li>
                <li><a onClick={() => this.userChoice('folders')}>Folders</a></li>
              </ul>
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
