import React, { useState } from 'react';
import QrReader from 'react-qr-reader'

const QrCodeScanner = (props) => {
    const [result, setResult] = useState(initialState)
    const handleError = () => {
        console.log('something went wrong')
    }
    const handleScan = data => {
        if (data) {
            setResult(data)
        }
    }
    return (
        < div >
            < QrReader
                delay={500}
                style={{
                    height: 240,
                    width: 320,
                }}
                onError={handleError}
                onScan={handleScan}
            />
            <p>{result}</p>
        </div>)
}

export default QrCodeScanner;