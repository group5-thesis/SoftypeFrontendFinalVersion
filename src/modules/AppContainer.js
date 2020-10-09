import Main from "."
import { ActionTypes, actionCreator } from "utils/actions"
import { connect } from "react-redux"
import api from 'utils/api'

const logout = dispatch => {
  dispatch(actionCreator(ActionTypes.LOGOUT))
  localStorage.removeItem("token")
  localStorage.removeItem("uId")
}

const mapStateToProps = state => ({
  appState: state.appState
})

const mapDispatchToProps = (dispatch, _) => ({
  checkLogin: async () => {
    let authStateResult = localStorage.getItem("token")
    let userId = localStorage.getItem("uId")
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING))
    if (authStateResult !== null && userId !== null) {
      let userId = localStorage.getItem("uId")
      if (userId) {
        userId = +userId
      }
      let res = await api.get(`/getProfile?userId=${userId}`)
      if (res.length) {
        let data = res[0]
        dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, data))
        dispatch(actionCreator(ActionTypes.LOGIN))
      } else {
        logout(dispatch);
      }
    }
    dispatch(actionCreator(ActionTypes.AUTH_CHECKED))
  },
  logout: () => {
    logout(dispatch)
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
