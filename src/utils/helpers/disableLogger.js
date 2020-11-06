
import { config } from 'utils/config'
const disableLogger = () => {
    if (!config.IS_DEV) {
        console.log = () => { };
    }
}


export { disableLogger };
