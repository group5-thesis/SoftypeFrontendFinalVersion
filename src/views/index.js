import Main from "./Main";
import { ActionTypes, actionCreator } from "utils/actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appState: state.appState
});

const mapDispatchToProps = (dispatch, _) => ({
  checkLogin: () => {
    let authStateResult = localStorage.getItem("token");
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING))
    if (authStateResult != null) {
      // let user = JSON.parse(window.user);
      dispatch(actionCreator(ActionTypes.LOGIN));
      // dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, user))
      dispatch(actionCreator(ActionTypes.FETCH_LEAVE_REQUEST));
    }
    dispatch(actionCreator(ActionTypes.AUTH_CHECKED));

  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
