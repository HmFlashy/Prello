import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../helpers/HeaderHelper'

export default {
    async authenticate(email, password){
        try {
            const res = await axios.get(`${UrlConfig.API}/login`, tokenHeader)
            return res.data
        } catch(error) {

        }
    }
}