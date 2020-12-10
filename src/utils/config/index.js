export const config = {
    API_URL_DEV: "http://localhost:8000/api",
    API_URL_LIVE: "http://ec2-3-0-177-104.ap-southeast-1.compute.amazonaws.com:8000/api",
    API_URL_BASE_LIVE: "http://ec2-3-0-177-104.ap-southeast-1.compute.amazonaws.com:8000",
    API_URL_BASE_DEV: "http://localhost:8000",
    IS_DEV:false,// process.env.NODE_ENV === 'development',
    PUSHER: {
        key: 'a76305e0740371c8f208',
        options: {
            cluster: 'ap1',
            encrypted: false,
            secret: '79c2513d7d36b3e18c1d'
        },
        channel: 'SofypeChannel'
    }
};



