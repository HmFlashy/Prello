import board from '../components/App/Board'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import urlConfig from '../config/UrlConfig'
import socketService from '../services/SocketService'

const socket = openSocket(urlConfig.API);


socket.on('connect', () => {
    console.log("mdr")
})

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(board);