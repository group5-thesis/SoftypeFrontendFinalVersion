export const config = {
    API_URL_DEV: "http://localhost:8000/api",
    API_URL_LIVE: "",
    API_URL_BASE_LIVE: "",
    API_URL_BASE_DEV: "http://localhost:8000",
    IS_DEV: process.env.NODE_ENV === 'development',
    PUSHER: {
        key: 'a76305e0740371c8f208',
        options: {
            cluster: 'ap1',
            encrypted: process.env.NODE_ENV === 'development' ? false : true,
            secret: '79c2513d7d36b3e18c1d'
        },
        channel: 'SofypeChannel'
    }
};


