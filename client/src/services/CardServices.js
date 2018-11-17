import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../helpers/HeaderHelper'

export default {
    async fetchCard(cardId) {
        try {
            const res = await axios.get(`${UrlConfig.API}/cards/${cardId}`, tokenHeader())
            return res.data
        } catch (e) {
            console.log(e)
            throw e
        }
    }, async updateCardApi(cardId, toUpdate) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}`, toUpdate, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }, async moveCardApi(cardId, data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}/move`, data, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }, async deleteCardApi(cardId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}`, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async addCardApi(name, listId, pos) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards`, {
                name: name,
                listId: listId,
                pos
            }, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async addCommentApi(cardId, data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards/${cardId}/comments`, data, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteCommentApi(cardId, commentId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}/comments/${commentId}`, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateCommentApi(cardId, commentId, data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}/comments/${commentId}`, data, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async createChecklist(cardId, data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards/${cardId}/checklists`, {
                name: data.name
            }, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteChecklist(cardId, checkListId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}`, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateChecklist(cardId, checkListId, data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}`, {
                name: data.name
            }, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async addItemToChecklist(cardId, checkListId, data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}/items`, {
                name: data.name
            }, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteItemToChecklist(cardId, checkListId, itemId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}/items/${itemId}`, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateItemToChecklist(cardId, checkListId, itemId, data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}/items/${itemId}`,
                data
                , tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async addLabel(cardId, labelId) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}/labels/${labelId}`, null, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async removeLabel(cardId, labelId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}/labels/${labelId}`, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async uploadLocalFile(cardId, file) {
        try {
            var formData = new FormData();
            formData.append("file", file);

            const res = await axios.post(`${UrlConfig.API}/cards/${cardId}/attachments`, formData, { ...tokenHeader(), 'Content-Type': 'multipart/form-data' })
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async uploadFile(cardId, data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards/${cardId}/attachments`, data, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteAttachment(cardId, attachmentId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}/attachments/${attachmentId}`, tokenHeader())
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}