import React, { Component } from 'react'
import { CAlert } from '@coreui/react'

export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false
        }

        componentDidMount() {
            this.handleConnectionChange()
            window.addEventListener('online', this.handleConnectionChange)
            window.addEventListener('offline', this.handleConnectionChange)
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange)
            window.removeEventListener('offline', this.handleConnectionChange)
        }


        handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline'
            if (condition === 'online') {
                const webPing = setInterval(
                    () => {
                        fetch('//google.com', {
                            mode: 'no-cors',
                        })
                            .then(() => {
                                this.setState({ isDisconnected: false }, () => {
                                    return clearInterval(webPing)
                                })
                            }).catch(() => this.setState({ isDisconnected: true }))
                    }, 2000)
                return
            }

            this.setState({ isDisconnected: true })
            // setTimeout(() => {
            //     this.handleConnectionChange()
            // }, 200)
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

    return NetworkDetector
}