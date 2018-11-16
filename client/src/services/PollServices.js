import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../helpers/HeaderHelper'

export default {
    async vote(data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${data.boardId}/polls/${data.pollId}/vote/${data.optionId}`, data, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async addOption(data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/boards/${data.boardId}/polls/${data.pollId}/options`, data, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async updatePoll(data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${data.boardId}/polls/${data._id}`, data, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async addPoll(data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/boards/${data.boardId}/polls`, data, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async deletePoll(data) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/boards/${data.boardId}/polls/${data._id}`, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async deletePollOption(data) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/boards/${data.boardId}/polls/${data._id}/options/${data.optionId}`, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async updatePollOption(data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/boards/${data.boardId}/polls/${data.pollId}/options/${data.optionId}`, data, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    }
}