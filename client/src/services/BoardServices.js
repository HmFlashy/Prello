import axios from "axios"
import UrlConfig from "../config/UrlConfig"
import {tokenHeader} from "../helpers/HeaderHelper"

export default {
    async fetchBoard(boardId) {
        try {
            const res = await axios.get(`${UrlConfig.API}/boards/${boardId}`, tokenHeader());
            return res.data
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async fetchBoards() {
        try {
            const res = await axios.get(`${UrlConfig.API}/boards`, tokenHeader());
            return res.data
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async fetchBoardInfo(boardId) {
        try {
            const res = await axios.get(`${UrlConfig.API}/boards/${boardId}/info`, tokenHeader());
            return res.data
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    async addBoard(name, categoryId, visibility, teamId) {
        try {
            const res = await axios.post(`${UrlConfig.API}/boards/`, {
                    name: name,
                    categoryId: categoryId,
                    visibility: visibility,
                    teamId: teamId
                },
                tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    },
    async addLabels(boardId, labelId) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${boardId}/labels/${labelId}`, tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    },
    async removeLabels(boardId, labelId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/boards/${boardId}/labels/${labelId}`, tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    },
    async updateBoard(boardId, name, categoryId, visibility) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${boardId}`, {
                name: name,
                visibility: visibility
            }, tokenHeader());
            await axios.put(`${UrlConfig.API}/me/boards/${boardId}/category`, {
                categoryId: categoryId,
            }, tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    }
}