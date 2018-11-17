import * as actions from '../actions/CardActions';
import cardReducer, { defaultCardReducer } from './CardReducer';
import moment from "moment"

describe('Unreferenced action', () => {
    it('should return the default state', () => {
        const newState = cardReducer(defaultCardReducer, { type: 'blabla ' });
        expect(newState).toEqual(defaultCardReducer);
    });
});

describe('Updating card', () => {
    it('should update the card name', () => {
        const newVal = "newName"
        const action = actions.actionUpdatingCard({ name: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", name: "currentName" }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.name).toEqual(newVal)
        });
    });
    it('should update the card description', () => {
        const newVal = "newDescription"
        const action = actions.actionUpdatingCard({ desc: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", desc: "currentDescription" }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.desc).toEqual(newVal)
        });
    });
    it('should update the card dueDate', () => {
        const newVal = moment.now()
        const action = actions.actionUpdatingCard({ dueDate: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", dueDate: moment.now() }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.dueDate).toEqual(newVal)
        });
    });
    it('should update the card dueDateCompleted', () => {
        const newVal = moment.now()
        const action = actions.actionUpdatingCard({ dueDateCompleted: moment.now(), _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", dueDateCompleted: moment.now() }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.dueDateCompleted).toEqual(newVal)
        });
    });
    it('should update the card list', () => {
        const newVal = "u00001"
        const action = actions.actionUpdatingCard({ list: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", list: "u33333" }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.list).toEqual(newVal)
        });
    });
    it('should update the card board', () => {
        const newVal = "u00002"
        const action = actions.actionUpdatingCard({ board: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", board: "u666666" }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.board).toEqual(newVal)
        });
    });
    it('should update the card pos', () => {
        const newVal = 13
        const action = actions.actionUpdatingCard({ pos: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", pos: 0 }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.pos).toEqual(newVal)
        });
    });
    it('should update the card isArchived', () => {
        const newVal = true
        const action = actions.actionUpdatingCard({ isArchived: newVal, _id: "u00000" })
        const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", isArchived: false }] }, action)
        newState.all.forEach(card => {
            if (card._id === "u00000")
                expect(card.isArchived).toEqual(newVal)
        });
    });
    it('should update all attributes', () => {
        let updateActions = [];
        const nameNewVal = "newName"
        const descNewVal = "newDescription"
        const dueDateNewVal = moment.now()
        const dueDateCompletedNewVal = moment.now()
        const listNewVal = "u00001"
        const boardNewVal = "u00002"
        const posNewVal = 13
        const isArchivedNewVal = true

        updateActions.push(actions.actionUpdatingCard({ name: nameNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ desc: descNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ dueDate: dueDateNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ dueDateCompleted: dueDateCompletedNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ list: listNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ board: boardNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ pos: posNewVal, _id: "u00000" }))
        updateActions.push(actions.actionUpdatingCard({ isArchived: isArchivedNewVal, _id: "u00000" }))

        let result
        updateActions.forEach(action => {
            result = cardReducer({
                all: [...defaultCardReducer.all, {
                    _id: "u00000"
                    , name: "currentName"
                    , desc: "currentDescription"
                    , dueDate: moment.now()
                    , dueDateCompleted: moment.now()
                    , list: "u33333"
                    , board: "u666666"
                    , pos: 0
                    , isArchived: false
                }]
            }, action)
        })
        expect(result.name === nameNewVal &&
            result.desc === descNewVal &&
            result.dueDate === dueDateNewVal &&
            result.dueDateCompleted === dueDateCompletedNewVal &&
            result.list === listNewVal &&
            result.board === boardNewVal &&
            result.pos === posNewVal &&
            result.isArchived === isArchivedNewVal)
    });

    describe('Update card', () => {
        it('should update the card name', () => {
            const newVal = "newName"
            const action = actions.actionUpdateCard({ name: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", name: "currentName" }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.name).toEqual(newVal)
            });
        });
        it('should update the card description', () => {
            const newVal = "newDescription"
            const action = actions.actionUpdateCard({ desc: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", desc: "currentDescription" }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.desc).toEqual(newVal)
            });
        });
        it('should update the card dueDate', () => {
            const newVal = moment.now()
            const action = actions.actionUpdateCard({ dueDate: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", dueDate: moment.now() }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.dueDate).toEqual(newVal)
            });
        });
        it('should update the card dueDateCompleted', () => {
            const newVal = moment.now()
            const action = actions.actionUpdateCard({ dueDateCompleted: moment.now(), _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", dueDateCompleted: moment.now() }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.dueDateCompleted).toEqual(newVal)
            });
        });
        it('should update the card list', () => {
            const newVal = "u00001"
            const action = actions.actionUpdateCard({ list: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", list: "u33333" }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.list).toEqual(newVal)
            });
        });
        it('should update the card board', () => {
            const newVal = "u00002"
            const action = actions.actionUpdateCard({ board: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", board: "u666666" }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.board).toEqual(newVal)
            });
        });
        it('should update the card pos', () => {
            const newVal = 13
            const action = actions.actionUpdateCard({ pos: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", pos: 0 }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.pos).toEqual(newVal)
            });
        });
        it('should update the card isArchived', () => {
            const newVal = true
            const action = actions.actionUpdateCard({ isArchived: newVal, _id: "u00000" })
            const newState = cardReducer({ all: [...defaultCardReducer.all, { _id: "u00000", isArchived: false }] }, action)
            newState.all.forEach(card => {
                if (card._id === "u00000")
                    expect(card.isArchived).toEqual(newVal)
            });
        });
        it('should update all attributes', () => {
            let updateActions = [];
            const nameNewVal = "newName"
            const descNewVal = "newDescription"
            const dueDateNewVal = moment.now()
            const dueDateCompletedNewVal = moment.now()
            const listNewVal = "u00001"
            const boardNewVal = "u00002"
            const posNewVal = 13
            const isArchivedNewVal = true

            updateActions.push(actions.actionUpdateCard({ name: nameNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ desc: descNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ dueDate: dueDateNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ dueDateCompleted: dueDateCompletedNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ list: listNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ board: boardNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ pos: posNewVal, _id: "u00000" }))
            updateActions.push(actions.actionUpdateCard({ isArchived: isArchivedNewVal, _id: "u00000" }))

            let result
            updateActions.forEach(action => {
                result = cardReducer({
                    all: [...defaultCardReducer.all, {
                        _id: "u00000"
                        , name: "currentName"
                        , desc: "currentDescription"
                        , dueDate: moment.now()
                        , dueDateCompleted: moment.now()
                        , list: "u33333"
                        , board: "u666666"
                        , pos: 0
                        , isArchived: false
                    }]
                }, action)
            })
            expect(result.name === nameNewVal &&
                result.desc === descNewVal &&
                result.dueDate === dueDateNewVal &&
                result.dueDateCompleted === dueDateCompletedNewVal &&
                result.list === listNewVal &&
                result.board === boardNewVal &&
                result.pos === posNewVal &&
                result.isArchived === isArchivedNewVal)
        });
    });

    describe('Delete a card', () => {
        it('should empty the card list', () => {
            const state = { all: [...defaultCardReducer.all, { _id: "u00000" }] }
            expect(state.all.length).toEqual(1);
            const newState = cardReducer(state, { type: 'DELETE_CARD', payload: { _id: "u00000" } });
            expect(newState.all.length).toEqual(0);
        });
    });


    describe('Labels', () => {
        it('should add a new label', () => {
            const state = { all: [...defaultCardReducer.all, { _id: "u00000", labels: [] }] }
            expect(state.all.find(card => card._id === "u00000").labels.length).toEqual(0);
            const newState = cardReducer(state, { type: 'CARD_ADDING_LABEL', payload: { _id: "u00000", labelId: "u11111" } });
            expect(newState.all.find(card => card._id === "u00000").labels.length).toEqual(1);
        });
        it('should remove a label', () => {
            const state = { all: [...defaultCardReducer.all, { _id: "u00000", labels: [{ _id: "u11111", color: "red", title: "database" }] }] }
            expect(state.all.find(card => card._id === "u00000").labels.length).toEqual(1);
            const newState = cardReducer(state, { type: 'CARD_REMOVING_LABEL', payload: { _id: "u00000", labelId: "u11111" } });
            expect(newState.all.find(card => card._id === "u00000").labels.length).toEqual(0);
        });
        it('should remove a label from all the card having it', () => {
            const state = { all: [...defaultCardReducer.all, { _id: "u00001", labels: [{ _id: "u11111", color: "red", title: "database" }] }, { _id: "u00000", labels: [{ _id: "u11111", color: "red", title: "database" }] }] }
            const newState = cardReducer(state, { type: 'DELETED_LABEL', payload: { label: { _id: "u11111" } } });
            expect(!newState.all.some(card => card.labels.find(label => label._id === "u11111")))
        });
    });

    describe('Attachments', () => {
        it('should add a new attachement', () => {
            const state = { all: [...defaultCardReducer.all, { _id: "u00000", cardInformation: { nbAttachments: 0 } }] }
            expect(state.all.find(card => card._id === "u00000").cardInformation.nbAttachments).toEqual(0);
            const newState = cardReducer(state, { type: 'ADD_CARD_ATTACHMENT', payload: { _id: "u00000" } });
            expect(newState.all.find(card => card._id === "u00000").cardInformation.nbAttachments).toEqual(1);
        });
        it('should add a new attachement', () => {
            const state = { all: [...defaultCardReducer.all, { _id: "u00000", cardInformation: { nbAttachments: 1 } }] }
            expect(state.all.find(card => card._id === "u00000").cardInformation.nbAttachments).toEqual(1);
            const newState = cardReducer(state, { type: 'REMOVE_CARD_ATTACHMENT', payload: { _id: "u00000" } });
            expect(newState.all.find(card => card._id === "u00000").cardInformation.nbAttachments).toEqual(0);
        });
    });
});