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
    async createLabel(boardId, name, color) {
        try {
            const res = await axios.post(`${UrlConfig.API}/boards/${boardId}/labels/`, {
                name: name,
                color: color
            }, tokenHeader())
            return res.data
        } catch (error) {
            throw error
        }
    },
    async updateLabel(boardId, labelId, name, color) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${boardId}/labels/${labelId}`, {
                name: name,
                color: color
            }, tokenHeader())
            return res.data
        } catch (error) {
            throw error
        }
    },
    async deleteLabel(boardId, labelId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/boards/${boardId}/labels/${labelId}`, tokenHeader())
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
    },
    async getMembers(boardId, value) {
        try {
            const res = await axios.get(`${UrlConfig.API}/boards/${boardId}/members/${value}`, tokenHeader());
            return res.data;
        } catch (error) {
            throw error
        }
    },
    async addMember(boardId, id) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${boardId}/members`, {_id: id}, tokenHeader());
            return res.data;
        } catch (error) {
            throw error
        }
    }
}