
import io from 'socket.io-client';
import urlConfig from '../config/UrlConfig'
import { actionCardNameUpdated } from '../redux/actions/CardActions'

const socket = io(urlConfig.SOCKET)

socket.on("connect", () => {
    console.log("Connected !")
})

socket.on("truc", ()=> {
    console.log("mdr")
})

socket.on("error", (error) => {
    console.log(error)
})

export default {
    subscribe(boardId) {
        socket.emit("subscribeToBoard")
    },
    init( store ){
        socket.on( "action", ( action ) => 
            store.dispatch(action) 
        )
    },
    emit( type, payload ) {
        socket.emit( type, payload )
    }
}