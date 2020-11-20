import React, { Component } from 'react'
import { CAlert, CToast, CToaster, CToastHeader, CToastBody } from '@coreui/react'
import Pusher from 'pusher-js';
import { actionCreator, ActionTypes } from "utils/actions";
import { config } from 'utils/config';
export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false,
            notify: false
        }

        componentDidMount() {
            let { PUSHER } = config;
            const pusher = new Pusher(PUSHER.key, PUSHER.options);
            const channel = pusher.subscribe(PUSHER.channel);
            channel.bind('message', notif => {
                this.notificationReceived(notif)
            });
        }

        notificationReceived = (notif) => {
            console.log(notif)
        }

        render() {
            let { notification, notify } = this.props.appState.app
            return (
                <>
                    {(notify && notification.message !== "") && (
                        <CToaster
                            position={"bottom-center"}
                            className={`mr-2 alert ${notification.type === "error" ? "alert-danger" : notification.type === "info" ? "alert-info" : "alert-success"}`}
                        >
                            <CToast
                                onStateChange={(e) => {
                                    if (!e) {
                                        this.props.dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: '', message: '' }));
                                    }
                                }}
                                show={true}
                                autohide={5000}
                                style={{ border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                                fade={true}
                            >
                                {notification.type === 'error' && <CToastHeader
                                    style={{ backgroundColor: 'transparent' }}
                                    className="text-dark"
                                    closeButton={false}>
                                    <strong>{notification.type}</strong>
                                </CToastHeader>}
                                <CToastBody
                                    className="text-dark text-center"
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    {notification.message}
                                </CToastBody>
                            </CToast>
                        </CToaster>
                        // <CAlert closeButton color={message.type === "error" ? "danger" : "success"} show={notify} style={{ position: "absolute", top: "0", left: "0", right: "0", textAlign: "center" }}><p>{message.message}</p></CAlert>
                    )
                    }
                    <ComposedComponent {...this.props} />
                </>
            )
        }
    }
    return NetworkDetector
}