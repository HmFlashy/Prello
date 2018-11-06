
import io from 'socket.io-client';
import urlConfig from '../config/UrlConfig'

const socket = io(urlConfig.SOCKET)

socket.on("error", (error) => {
    console.log(error)
})

export default {
    subscribe(boardId) {
        socket.emit("subscribeBoard", boardId)
    },
    unsubscribe(boardId) {
        socket.emit("unsubscribeBoard", boardId)
    },
    init( store ){
        socket.on( "action", ( action ) => 
            store.dispatch(action) 
        )

        
        socket.on("connect", () => {
            const boardId = store.getState().boards.currentBoard._id
            if(boardId !== null){
                this.subscribe(boardId)
            }
            console.log("Connected !")
        })
    },
    emit( type, payload ) {
        socket.emit( type, payload )
    }
}