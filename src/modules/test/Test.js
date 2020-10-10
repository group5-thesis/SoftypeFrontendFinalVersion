import React, { useState } from "react"
import { CButton, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { CenteredLayout } from "containers"

const Test = () => {
    const [credentials, setCredentials] = useState({
        username_email: "",
        password: ""
    })

    const test1 = (tes) => {
        alert(JSON.stringify(credentials.username_email))
    }

    

    // constructor(props) {
    //     super(props)
    //     this.addRow = this.addRow.bind(this)
    //     this.state = {
    //       rows: []
    //     }
    // }

    // addRow() {
    //     var nextState = this.state;
    //     nextState.rows.push('placeholder');
    //     this.setState(nextState);
    // }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials({ [name]: value })
    }

    return (
        <>
         <CenteredLayout md={9} bg={false}>
            <table>
            <tbody>
            {credentials.username_email}
                 {/* {this.state.rows.map(row => <tr></tr>)} */}
            </tbody>
            </table>
            <CButton className="yolo" color="primary" onClick={() => {
                test1("yol")
            }}>Test</CButton>

            <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                    <CInputGroupText>
                        <CIcon name="cil-user" />
                    </CInputGroupText>
                </CInputGroupPrepend>
                
                <CInput
                    type="text"
                    value={credentials.username_email || ""}
                    placeholder="email/username"
                    name="username_email"
                    autoComplete="email"
                    onChange={handleChange}
                />
            </CInputGroup>
            </CenteredLayout>
        </>
    )
}



//<template> </tempate>

export default Test