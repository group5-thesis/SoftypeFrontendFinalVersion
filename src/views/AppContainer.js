import Main from "."
import { ActionTypes, actionCreator } from "utils/actions"
import { connect } from "react-redux"
import api from 'utils/api'
import { plotArray } from 'utils/helpers'

const logout = dispatch => {
  dispatch(actionCreator(ActionTypes.LOGOUT))
  localStorage.removeItem("token")
  localStorage.removeItem("uId")
}

const mapStateToProps = state => ({
  appState: state.appState,
})



const mapDispatchToProps = (dispatch, _) => ({
  checkLogin: async () => {
    let authStateResult = localStorage.getItem("token")
    let userId = localStorage.getItem("uId")
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING))
    if (authStateResult !== null && userId !== null) {
      userId = +userId
      let res = await api.get(`/getProfile?userId=${userId}`)
      let { error, data } = res
      if ((!error) && data.length) {
        let user = data[0]
        dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, user))
        dispatch(actionCreator(ActionTypes.LOGIN))
      // }else {
      //   logout(dispatch);
      }
    }
    dispatch(actionCreator(ActionTypes.AUTH_CHECKED))
  },
  logout: () => {
    logout(dispatch)
  },
  dispatch
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
