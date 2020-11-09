import React, { Component } from 'react'
import { CAlert } from '@coreui/react'
import Pusher from 'pusher-js';
import { actionCreator, ActionTypes } from "utils/actions";
import { connect } from 'react-redux'
export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false,
            notify: false
        }

        componentDidMount() {
            const pusher = new Pusher('a76305e0740371c8f208', {
                cluster: 'ap1',
                encrypted: true,
                secret: '79c2513d7d36b3e18c1d'
            });
            const channel = pusher.subscribe('softypeChannel');
            channel.bind('message', notif => {
                this.notificationReceived(notif)
            });
            console.log(this.props)
        }

        notificationReceived = (notif) => {
            console.log(notif)
        }

        render() {
            const { isDisconnected } = this.state
            return (
                <div>
                    {isDisconnected && (
                        <CAlert closeButton color="warning" show={isDisconnected} style={{ position: "absolute", top: "0", left: "0", right: "0", textAlign: "center" }}><p>No internet connection.</p></CAlert>
                    )
                    }
                    <ComposedComponent {...this.props} />
                </div>
            )
        }
    }

    // return NetworkDetector

    const mapStateToProps = (state) => ({
        app: state.appState.app
    })

    const mapDispatchToProps = {
        removeNotification: dispatch => {
            dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: null, message: '' }))
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(NetworkDetector)
}