

const disableLogger = () => {
    if (process.env.NODE_ENV === 'production') {
        console.log = () => { };
    }
}


export { disableLogger };
