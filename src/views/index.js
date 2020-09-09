import Main from "./Main";
import { ActionTypes, actionCreator } from "utils/actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appState: state.appState
});

const mapDispatchToProps = (dispatch, _) => ({
  checkLogin: () => {
    let authStateResult = localStorage.getItem("token");
    if (authStateResult != null) {
      dispatch(actionCreator(ActionTypes.LOGIN));
    }
    dispatch(actionCreator(ActionTypes.AUTH_CHECKED));
    // setTimeout(() => {
    //   dispatch(actionCreator(ActionTypes.AUTH_CHECKED));
    // },2000);
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
