import React, { Component, createRef } from "react";
import {
  CButton,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CAlert,
  CInvalidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { shallowCopy, checkCamera, checkDevice } from "utils/helpers";
import { APP_MESSAGES } from "utils/constants/constant";
import { actionCreator, ActionTypes } from "utils/actions";
import { ConfirmDialog, Modal } from "reusable";
import api from "utils/api";
import { CenteredLayout } from "containers";
import QrCodeScanner from "./QrCodeScanner";
import { config } from 'utils/config'

const invalidCredentialsMessage = "Invalid Credentials"
class Login extends Component {

  state = {
    credentials: {
      username: config.IS_DEV ? "ytorres1" : '',
      password: config.IS_DEV ? "yoltorres24!" : '',
    },
    camera: false,
    changed: false,
    isLoading: false,
    error: "",
    cameraError: '',
    showError: false
  };
  dialog = createRef();

  handleChange = (e) => {
    this.setState({ changed: true, showError: false, error: '' });
    let copy = shallowCopy(this.state.credentials);
    copy[e.target.name] = e.target.value;
    this.setState({ credentials: copy });
  };

  toggleDialog = () => {
    this.dialog.current.toggle();
  }

  loginAttempt = async () => {
    this.setState({ showError: false })
    if (!this.props.already_logged) {
      let { dispatch, history } = this.props;
      if (
        this.state.credentials.password === "" ||
        this.state.credentials.username === ""
      ) {
        this.setState({ showError: true, error: APP_MESSAGES.INPUT_REQUIRED });
        return;
      }
      this.setState({ isLoading: true });
      dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING));
      let res = await api.post("/login", this.state.credentials);
      this.setState({ isLoading: false });
      if (!res.error) {
        let { access_token, account_information } = res.data;
        let user;
        if (account_information.length) {
          user = account_information[0];
        }

        if (!user) {
          this.setState({ showError: true, error: APP_MESSAGES.INPUT_REQUIRED });
          this.setState({ error: invalidCredentialsMessage, showError: true });
          this.setState({ isLoading: false });
        }

        localStorage.setItem("token", access_token);
        localStorage.setItem("uId", user.userId);
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
        this.setState({ error: res.message, showError: true });
        this.setState({ isLoading: false });
        // this.toggleDialog();
      }
    }
  };

  componentDidMount() {
    sessionStorage.clear();
    if (!this.props.already_logged) {
      checkCamera()
        .then(() => {
          this.setState({ camera: true });
        })
        .catch((err) => {
          this.setState({ cameraError: err.cameraError, camera: false });
        });
    }
  }
  render() {
    let { showError, error } = this.state
    if (this.props.already_logged) {
      return <Redirect to="/dashboard" />;
    }
    sessionStorage.clear();
    return (
      <CenteredLayout>
        <ConfirmDialog
          id="cutom_dialog"
          ref={this.dialog}
          {...{
            confirmButton: false,
            title: this.state.cameraError,
            cancelButtonText: "Ok",
          }}
        ></ConfirmDialog>
        <CForm>
          <h2>Welcome Back</h2>
          <p className="text-muted">Sign In to your account</p>
          {
            showError &&
            <CAlert color="danger" className="text-center">
              {error}
            </CAlert>
          }
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
              disabled={this.state.isLoading}
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
              disabled={this.state.isLoading}
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
          {/* {!this.state.camera || this.state.isLoading ? (
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
              <QrCodeScanner

                onLoading={(status) => this.setState({ isLoading: status })}
              />
            )} */}

          <CButton
            block
            className="float-center"
            color="primary"
            variant="outline"
            disabled={this.state.isLoading}
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
