import axios from "axios";
import UrlConfig from "../config/UrlConfig";
import {tokenHeader} from "../helpers/HeaderHelper";

export default {
    async unstarBoard(boardId) {
        try {
            await axios.delete(`${UrlConfig.API}/me/boardStars/${boardId}`, tokenHeader())
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async starBoard(boardId) {
        try {
            await axios.post(`${UrlConfig.API}/me/boardStars/${boardId}`, {}, tokenHeader())
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async getProfile() {
        try {
            const res = await axios.get(`${UrlConfig.API}/profile`,
                tokenHeader())
            return res.data
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async getUsersWithQuery(query){
        try {
            const res = await axios.get(`${UrlConfig.API}/me?query=${query}`,
                tokenHeader())
            return res.data
        } catch(error) {
            console.log(error)
            throw error
        }
    },
    async addCategory(name){
        try {
            const res = await axios.post(`${UrlConfig.API}/me/categories`, {name: name}, tokenHeader())
            return res.data
        } catch(error) {
            console.log(error)
            throw error
        }
    },
    async deleteCategory(id){
        try {
            const res = await axios.delete(`${UrlConfig.API}/me/categories/${id}`, tokenHeader())
            return res.data
        } catch(error) {
            console.log(error)
            throw error
        }
    },
    async updateCategoryName(id, name){
        try {
            const res = await axios.put(`${UrlConfig.API}/me/categories/${id}`, { name }, tokenHeader())
            return res.data
        } catch(error) {
            console.log(error)
            throw error
        }
    },
    async addClientApplication(name){
        try {
            const res = await axios.post(`${UrlConfig.API}/me/client_applications`, { name }, tokenHeader())
            return res.data
        } catch(error) {
            console.log(error)
            throw error
        }
    },
    async addURI(clientId, uri){
        try {
            const res = await axios.post(`${UrlConfig.API}/me/client_applications/${clientId}/uris`, { clientId, uri }, tokenHeader())
            return res.data
        } catch(error){
            console.log(error)
            throw error
        }
    },
    async removeURI(clientId, uri){
        try {
            const res = await axios.delete(`${UrlConfig.API}/me/client_applications/${clientId}/uris/${uri}`, tokenHeader())
            return res.data
        } catch(error){
            console.log(error)
            throw error
        }
    }
}