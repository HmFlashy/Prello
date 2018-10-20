import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { actionGetCard } from '../redux/actions/CardActions'

export default {
    async getCard(cardId) {
        try{
            const res = await axios.get(`${UrlConfig.API}/cards/${cardId}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            return actionGetCard(res.data)
        } catch (e) {
            console.log(e)
            throw e
        }    
    }
}