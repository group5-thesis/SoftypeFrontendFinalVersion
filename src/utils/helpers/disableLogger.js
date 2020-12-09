
import { config } from 'utils/config'
const disableLogger = () => {
    let logger = console.log;
    if (!config.IS_DEV) {
        console.log = () => { };
    }else{
        console.log = logger;
    }
}
export { disableLogger };
