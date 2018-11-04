import axios from "axios";
import UrlConfig from "../config/UrlConfig";
import {tokenHeader} from "../helpers/HeaderHelper";

export default {
    async unstarBoard(boardId, userId) {
        try {
            await axios.delete(`${UrlConfig.API}/users/${userId}/boardStars/${boardId}`, tokenHeader())
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async starBoard(boardId, userId) {
        try {
            await axios.post(`${UrlConfig.API}/users/${userId}/boardStars/${boardId}`, {}, tokenHeader())
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async getUser() {
        try {
            const res =  await axios.get(`${UrlConfig.API}/profile`,
                tokenHeader())
            return res.data
        } catch (e) {
            console.log(e);
            throw e
        }
    }
}