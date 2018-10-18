
import io from 'socket.io-client';
import urlConfig from '../config/UrlConfig'

const socket = io.connect(urlConfig.API)

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
    }
}