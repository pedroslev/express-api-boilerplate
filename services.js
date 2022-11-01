import dotenv from 'dotenv'

dotenv.config()

let getDBState = (conn) => {

    switch (conn) {
        case 0:
            return(`DISCONNECTED`)
        break;
    
        case 1:
            return(`CONNECTED`)
        break;
    
        case 2:
            return(`CONNECTING`)
        break;
    
        case 3:
            return(`DISCONNECTING`)
        break;
    
        default:
            break;
    }
}


export {
    getDBState,
}