import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { basicHeader } from '../helpers/HeaderHelper'

export default {
    async authenticate(email, password){
        try {
            const res = await axios.post(`${UrlConfig.API}/login`, {
                email: email,
                password: password
            }, basicHeader())
            return res.data
        } catch(error) {

        }
    }
}