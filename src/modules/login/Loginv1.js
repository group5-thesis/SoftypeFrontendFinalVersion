import React, { Component, createRef } from "react";
import {
  CButton,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CInvalidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { shallowCopy, checkCamera } from "utils/helpers";
import { APP_MESSAGES } from "utils/constants/constant";
import { actionCreator, ActionTypes } from "utils/actions";
import { ConfirmDialog, Modal } from "reusable";
import api from "utils/api";
import { CenteredLayout } from "containers";
import QrCodeScanner from "./QrCodeScanner";

class Login extends Component {

  state = {
    credentials: {
      username: "ytorres",
      password: "Softype@100",
    },
    camera: false,
    changed: false,
    isLoading: false,
    error: "",
  };
  dialog = createRef();

  handleChange = (e) => {
    this.setState({ changed: true });
    let copy = shallowCopy(this.state.credentials);
    copy[e.target.name] = e.target.value;
    this.setState({ credentials: copy });
  };

  toggleDialog = () => {
    this.dialog.current.toggle();
  }

  loginAttempt = async () => {
    if (!this.props.already_logged) {
      let { dispatch, history } = this.props;
      if (
        this.state.credentials.password === "" ||
        this.state.credentials.username === ""
      ) {
        this.setState({ error: APP_MESSAGES.INPUT_REQUIRED });
        this.toggleDialog();
        return;
      }
      this.setState({ isLoading: true });
      dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING));
      let res = await api.post("/login", this.state.credentials);
      this.setState({ isLoading: false });
      if (!res.error) {
        let { access_token, account_information } = res.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("uId", account_information[0].userId);
        dispatch(
          actionCreator(
            ActionTypes.FETCH_PROFILE_SUCCESS,
            account_information[0]
          )
        );
        dispatch(actionCreator(ActionTypes.FETCH_LEAVE_REQUEST));
        dispatch(actionCreator(ActionTypes.LOGIN));
        history.replace("/");
      } else {
        this.setState({ error: res.message });
        this.setState({ isLoading: false });
        this.toggleDialog();
      }
    }
  };

  componentDidMount() {
    if (!this.props.already_logged) {
      checkCamera()
        .then(() => {
          this.setState({ camera: true });
        })
        .catch((err) => {
          this.setState({ camera: false });
          this.setState({ error: err.cameraError });
        });
    }
  }
  render() {
    if (this.props.already_logged) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <CenteredLayout>
        <ConfirmDialog
          id="cutom_dialog"
          ref={this.dialog}
          {...{
            confirmButton: false,
            title: this.state.error,
            cancelButtonText: "Ok",
          }}
        ></ConfirmDialog>
        <CForm>
          <h2>Welcome Back</h2>
          <p className="text-muted">Sign In to your account</p>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-user" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              value={this.state.credentials.username || ""}
              placeholder="email/username"
              name="username"
              autoComplete="email"
              invalid={
                this.state.credentials.username === "" &&
                this.state.changed
              }
              onChange={this.handleChange}
            />
            <CInvalidFeedback className="help-block">
              {APP_MESSAGES.INPUT_REQUIRED}
            </CInvalidFeedback>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-lock-locked" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="password"
              value={this.state.credentials.password || ""}
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              invalid={this.state.credentials.password === "" && this.changed}
            />
            <CInvalidFeedback className="help-block">
              {APP_MESSAGES.INPUT_REQUIRED}
            </CInvalidFeedback>
          </CInputGroup>
          <CButton
            block
            onClick={this.loginAttempt}
            disabled={
              this.state.isLoading ||
              this.state.credentials.password === "" ||
              this.state.credentials.email === ""
            }
            color="primary"
            className="px-4"
          >
            {this.state.isLoading ? (
              <CSpinner color="secondary" size="sm" />
            ) : (
                "Login"
              )}
          </CButton>
          <hr className="hr-text" data-content="OR" />
          {!this.state.camera || this.state.isLoading ? (
            <CButton
              disabled={this.state.isLoading}
              block
              onClick={this.toggleDialog}
              color="primary"
              className="px-4"
            >
              {" "}
              Login with QRCode{" "}
            </CButton>
          ) : (
              <QrCodeScanner />
            )}

          <CButton
            block
            className="float-center"
            color="link"
            onClick={() => {
              this.props.history.push("/account-recovery");
            }}
          >
            Forgot password
          </CButton>
        </CForm>
      </CenteredLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  already_logged: state.appState.auth.already_logged,
});

export default connect(mapStateToProps)(Login);
