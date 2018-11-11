import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { basicHeader, tokenHeader } from '../helpers/HeaderHelper'

export default {
    async authenticate(email, password, ldapConfig) {
        try {
            const res = await axios.post(`${UrlConfig.API}/login`, {
                email: email,
                password: password,
                ...ldapConfig
            }, basicHeader())
            return res.data
        } catch (error) {
            throw error.response
        }
    },
    async register(credentials) {
        try {
            const res = await axios.post(`${UrlConfig.API}/register`, credentials, basicHeader())
            return res.data
        } catch (error) {
            throw error.response
        }
    },
    getToken() {
        return localStorage.getItem("token-prello")
    },
    logout() {
        localStorage.removeItem("token-prello")
    },
    async updateProfile(data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/me`, data, tokenHeader())
            return res.data
        } catch (error) {
            throw error.response
        }
    },
    async authenticateLdap(email, password) {

    }
}