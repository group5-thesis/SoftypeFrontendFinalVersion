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

const retrieveLeaveRequests = async (dispatch, payload) => {
  let res = await api.post("/getLeaveRequest", payload);
  if (!res.error) {
    let { leave_requests } = res.data;
    dispatch(actionCreator(ActionTypes.FETCH_LEAVE_REQUEST, leave_requests));

  }
}

const retrieveEmployees = async dispatch => {
  let res = await api.get("/retrieve_employees");
  if (!res.error) {
    dispatch(actionCreator(ActionTypes.FETCH_EMPLOYEES, res.data.employee_information));
  }
}

const fetchTickets = async dispatch => {
  let response = await api.get('/retrieve_tickets')
  if (response.error) {
  }
  else {
    var temp = response.data.ticket_information;
    temp = plotArray(temp)
    dispatch(actionCreator(ActionTypes.FETCH_TICKETS, temp))
  }
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
      userId = +userId
      let res = await api.get(`/getProfile?userId=${userId}`)
      let { error, data } = res
      if ((!error) && data.length) {
        let user = data[0]
        let { employeeId, roleId } = user
        const payload = { employeeId, roleId };

        dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, user))
        dispatch(actionCreator(ActionTypes.LOGIN))
        retrieveLeaveRequests(dispatch, payload)
        fetchTickets(dispatch)
        retrieveEmployees(dispatch)
      }
      // else {
      //   logout(dispatch);
      // }
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
