const List = require("../models/index").List;
const Card = require("../models/index").Card;
const Comment = require("../models/index").Comment;
const Attachment = require("../models/index").Attachment;
const throwError = require("../helper/RequestHelper").throwError;

const getCardById = async (cardId) => {
    try {
        const card = await Card.findById(cardId).populate(
            [{
                path: "labels"
            }, {
                path: "members"
            },
            {
                path: "list"
            },
            {
                path: "comments",
                populate: {
                    path: "author",
                    select: ["_id", "fullName", "initials", "username"]
                }
            },
            {
                path: "attachments",
                populate: {
                    path: "owner",
                    select: ["_id", "fullName", "initials", "username", "bio"]
                }
            }]
        )
        return card
    } catch (error) {
        throw error
    }
};

const addAttachment = async (name, owner, cardId, url) => {
    try {
        attachment = new Attachment({
            name,
            owner,
            card: cardId,
            url
        })
        attachment = await attachment.save()
        card = await Card.findOne({ _id: cardId })
        card.cardInformation.nbAttachments = card.cardInformation.nbAttachments + 1
        card.attachments.push(attachment._id)
        return [await Attachment.findById(attachment._id).populate(
            [{
                path: "owner",
                select: ["_id", "fullName", "initials", "username"]
            }]
        ), await card.save()]
    } catch (error) {
        throw error
    }
};

const deleteAttachment = async (cardId, attachmentId) => {
    await Attachment.deleteOne({ _id: attachmentId })
    card = await Card.findOne({ _id: cardId })
    card.cardInformation.nbAttachments = card.cardInformation.nbAttachments - 1
    card.attachments = card.attachments.filter(attachment => attachment != attachmentId)
    card = await card.save()
    return card
}

const addComment = async (cardId, author, content) => {
    comment = new Comment({
        author,
        card: cardId,
        content
    });
    comment = await comment.save()
    return [await Comment.findById(comment._id).populate(
        [{
            path: "author",
            select: ["_id", "fullName", "initials", "username"]
        }]
    ), await Card.findOneAndUpdate({ _id: cardId },
        { $push: { comments: comment._id } }, { "new": true })]
}

const deleteComment = async (cardId, commentId) => {
    await Comment.deleteOne({ _id: commentId })
    return await Card.findOneAndUpdate({ _id: cardId },
        { $pull: { comments: commentId } }, { "new": true })
}

const updateComment = async (cardId, commentId, content) => {
    const comment = await Comment.findOneAndUpdate({ _id: commentId },
        { $set: { content: content, wasModified: true, dateModified: Date.now() } }, { "new": true })
    return [comment, await Card.findOne({ _id: cardId })]
}

const addCard = async (name, listId, pos) => {
    try {
        const list = await List.findById(listId);
        if (!list) throwError(404, 'LIST_NOT_FOUND');

        card = new Card({
            name: name,
            list: listId,
            board: list.board,
            pos
        });
        let array = [];
        array.push(card.save());
        array.push(List.updateOne({ _id: listId },
            { $push: { cards: card } }));
        [card] = await Promise.all(array);
        return card
    } catch (error) {
        try {
            if (card) await card.remove();
            await list.save();
        } catch (error) {
            console.log("DB corrupted!!!");
            throw error
        }
        throw error
    }
};

const moveCard = async (cardId, newListId, pos) => {
    let oldList = null;
    let newList = null;
    let card = null;
    try {
        let array = [];
        array.push(await List.findOne({ cards: { $in: [cardId] } }));
        array.push(await List.findById(newListId).exec());
        array.push(await Card.findById(cardId));
        [oldList, newList, card] = await Promise.all(array);
        if (!oldList) throwError(404, `OLD_LIST_NOT_FOUND`);
        if (!card) throwError(404, `CARD_NOT_FOUND`);
        if (!newList) throwError(404, `NEW_LIST_NOT_FOUND`);

        array = [];
        array.push(await List.findOneAndUpdate({ _id: card.list }, { $pull: { cards: cardId } }));
        array.push(await List.findOneAndUpdate({ _id: newListId }, { $push: { cards: cardId } }));
        array.push(await Card.findOneAndUpdate({ _id: cardId }, {
            list: newListId,
            board: newList.board,
            pos
        }));
        const [oldListUpdated, newListUpdated, cardUpdated] = await Promise.all(array);
        if (!cardUpdated) throwError(404, `CARD_NOT_FOUND`);
        return [newListUpdated, cardUpdated];
    } catch (error) {
        try {
            if (oldList) await oldList.save();
            if (newList) await newList.save();
            if (card) await card.save();
        } catch (error) {
            console.log("DB corrupted !!!");
            throw error
        }
        throw error
    }
};

const getCards = async () => {
    try {
        return await Card.find({})
    }
    catch (error) {
        throw error
    }
};

const updateCard = async (cardId, data) => {
    try {
        return await Card.findOneAndUpdate({ _id: cardId }, { $set: data }, { "new": true })
    } catch (error) {
        throw error
    }
}

const addToArray = async (cardId, key, data) => {
    try {
        return await Card.findOneAndUpdate({ _id: cardId },
            { $push: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}

const removeToArray = async (cardId, key, data) => {
    try {
        console.log(data)
        return await Card.findOneAndUpdate({ _id: cardId },
            { $pull: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}

const deleteCard = async (cardId) => {
    try {
        const card = await Card.findById(cardId);
        if (!card) {
            throwError(404, `The card ${cardId} was not found`)
        }
        if (!card.isArchived) {
            throwError(400, "Can't delete a card not archived")
        }
        card.remove();
        return card
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    getCardById,
    getCards,
    addCard,
    updateCard,
    addToArray,
    removeToArray,
    deleteCard,
    moveCard,
    addComment,
    deleteComment,
    updateComment,
    addAttachment,
    deleteAttachment
};
