    import React from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CCol, CRow, CButtonToolbar } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import { shallowCopy } from 'utils/helpers';
import NoData from 'reusable/NoData';


const User = ({ match }) => {
  const usersData = useSelector(state => {
    // show:false
    return state.appState.employee.employees
  })
  const user = usersData.find(user => String(user.id)=== match.params.id)
  if (!Object.keys(user).length) {
    return <NoData />
  }
  // const UpdateEmployee = async () =>{
  //   let res = await api.post("/update_employee", employee)
  //   if(!res.error){
  //     console.log(res)
  //     dispatch(actionCreator(ActionTypes.UPDATE_EMPLOYEE, employee))
    
  //   }
  // }
  // const updateData = async () => {
  //   let newUser = shallowCopy(user[0])

    //unsaon pag reuse sa form ?????????? wa kuy alamag ani.......

    // firstname : newUser.firstname
    // lastname : newUser.lastname
    // middlename : newUser.middlename
    // roleId : newUser.roleId
    // department : newUser.department
    // gender : newUser.gender
    // mobileno : newUser.mobileno
    // bithdate : newUser.birthdate
    // email : newUser.email
    // street : newUser.street
    // city : newUser.city
    // country : newUser.country
    
  // }


  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    

 const showModal = () => {
    this.setState({ show: true });
  };

 const  hideModal = () => {
    this.setState({ show: false });
  };
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  userDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td><strong>{value}</strong></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </CCardBody>
          <CButtonToolbar justify="end">
            <CButton type="button" color="warning" onClick={showModal}>Update</CButton>
            <CButton color="danger">Delete</CButton>
          </CButtonToolbar>

        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
