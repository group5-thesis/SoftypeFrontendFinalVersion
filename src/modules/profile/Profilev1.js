import React, { Component } from "react";
import api from "utils/api";
import { CButton, CCol, CRow, CImg } from "@coreui/react";
import { toCapitalize, getAge } from "utils/helpers";
import res from "assets/img";
import { config } from 'utils/config'

class ProfilePage extends Component {
  state = {
    loading: true,
    src: res.logoSm,
    userDetails: {},
  };


  componentDidMount() {
    let getQrCode = async (user) => {
      let _res = await api.get(`/image/${user.qr_code}`)
      if (!_res.error) {
        var svg64 = btoa(_res)
        var b64start = 'data:image/svg+xmlbase64,'
        var image64 = b64start + svg64
        return image64
      } else {
        return res.logoSm
      }
    }
    let { user } = this.props.auth;
    let qr = getQrCode(user);
    this.setState({ loading: false });
    if (qr !== "error") {
      this.setState({
        userDetails: {
          Address: `${toCapitalize(user.street)} ${toCapitalize(
            user.city
          )} ${toCapitalize(user.country)}`,
          Age: getAge(user.birthdate),
          Email: user.email,
          "Mobile Number": user.mobileno,
          Position: user.position,
        },
      });
    }
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let { user } = this.props.auth;
    let { loading, src, userDetails } = this.state;
    let baseUrl = `${!config.IS_DEV ? config.API_URL_BASE_LIVE : config.API_URL_BASE_DEV}/file/images`
    let fullname = `${toCapitalize(user.firstname)} ${user.middlename && toCapitalize(user.middlename) + " "
      }${toCapitalize(user.lastname)}`
    return (
      <>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CRow>
              <CCol md={4} className="justify-content-center">
                <CImg
                  src={user.profile_img ? `${baseUrl}/${user.profile_img}` : res.logoSm}
                  style={{
                    width: '100%',
                  }}
                  className="mb-2"
                />
              </CCol>
              <CCol md={7}>
                <h3>
                  Name:{" "}
                  {fullname}
                </h3>
                {Object.entries(userDetails).map(([key, value]) => {
                  return (
                    <h6 key={key}>
                      {key} : {value}
                    </h6>
                  );
                })}
                <CButton
                  block
                  className="mr-5 px-4"
                  onClick={() => {
                    this.props.toggleModal()
                    this.props.history.push("/myAccount");
                  }}
                  color="primary"
                >
                  {"Update"}
                </CButton>
              </CCol>

            </CRow>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ProfilePage;
