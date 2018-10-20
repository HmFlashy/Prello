import axios from 'axios'
import UrlConfig from '../config/UrlConfig'

export default {
    async updateListNameApi(listId, newName) {
        try {
            const res = await axios.put(`${UrlConfig.API}/lists/${listId}`, {
                name: newName
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    }
}