import Main from "."
import { ActionTypes, actionCreator } from "utils/actions"
import { connect } from "react-redux"
import api from 'utils/api'
import { plotArray } from 'utils/helpers'
import {
  retrieveLeaveRequests,
  retrieveEmployees,
  fetchTickets,
  fetchCompanyFiles,
  fetchCompanyVideos,
  fetchCompanyImages,
  fetchCompanyDocuments
} from 'utils/helpers/fetch'

const logout = dispatch => {
  dispatch(actionCreator(ActionTypes.LOGOUT))
  localStorage.removeItem("token")
  localStorage.removeItem("uId")
}

const mapStateToProps = state => ({
  appState: state.appState,
  retrieveLeaveRequests,
  fetchTickets,
  retrieveEmployees,
})

const retrieve = async (dispatch, payload ) => {
  let retry = 5;
  let resp1 = await retrieveLeaveRequests(dispatch, payload)
  let resp2 = await fetchTickets(dispatch)
  let resp3 = await retrieveEmployees(dispatch)
  let resp4 = await fetchCompanyFiles(dispatch)
  let resp5 = await fetchCompanyVideos(dispatch)
  let resp6 = await fetchCompanyImages(dispatch)
  let resp7 = await fetchCompanyDocuments(dispatch)
  let hasError = false;
  let responses = [resp1, resp2, resp3, resp4, resp5, resp6, resp7]
  responses.map(resp => {
    if (resp.error) {
      hasError = true
    }
  })

  if (hasError) {
    if (retry !== 0) {
      retrieve(dispatch, payload)
      --retry;
    } else { alert("Error in fetching some data") }
  }
}

const mapDispatchToProps = (dispatch, _) => ({
  checkLogin: async () => {
    let authStateResult = localStorage.getItem("token")
    let userId = localStorage.getItem("uId")
    dispatch(actionCreator(ActionTypes.LOADING_STARTED))
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING))
    let payload = {}
    if (authStateResult !== null && userId !== null) {
      userId = +userId
      let res = await api.get(`/getProfile?userId=${userId}`)
      let { error, data } = res
      if ((!error) && data.length) {
        let user = data[0]
        let { employeeId, roleId } = user
        payload = { employeeId, roleId };
        dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, user))
        dispatch(actionCreator(ActionTypes.LOGIN))
        await retrieve(dispatch, payload)
      }
      // else {
      //   logout(dispatch);
      // }
    }
    dispatch(actionCreator(ActionTypes.AUTH_CHECKED))
    dispatch(actionCreator(ActionTypes.LOADING_DONE))
  },
  logout: () => {
    logout(dispatch)
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
