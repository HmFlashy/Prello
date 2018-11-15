const Board = require("../models/index").Board;
const Poll = require("../models/index").Poll;
const throwError = require("../helper/RequestHelper").throwError;
//Return poll
const vote = async (boardId, pollId, optionId, isVoting, userId) => {

}
//Returns added option
const addOption = async (boardId, pollId, title) => {

}
//Returns poll
const updatePoll = async (boardId, pollId, card, title) => {

}
//Returns poll
const addPoll = async (boardId, title, card, owner) => {

}
const deletePoll = async (boardId, pollId) => {

}
const deletePollOption = async (boardId, pollId, optionId) => {

}
const updatePollOption = async (boardId, pollId, optionId, name) => {

}

module.exports = {
    vote,
    addOption,
    updatePoll,
    addPoll,
    deletePoll,
    deletePollOption,
    updatePollOption
};