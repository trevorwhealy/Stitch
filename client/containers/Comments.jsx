import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActionCreators from '../actions/CommentActions.jsx';
import NoteComments from '../components/NoteComments.jsx';

const mapStateToProps = state => {
  return {
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  commentActions: bindActionCreators(commentActionCreators, dispatch),
});


const Comments = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteComments);

export default Comments;
