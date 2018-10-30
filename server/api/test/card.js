//During the test the env variable is set to test
const Card = require("../models/index").Card;
const Board = require("../models/index").Board;
const mongoose = require("mongoose");
require("../../config/db");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
let card = null;

describe("Board", () => {
    beforeEach((done) => { // Before each test we empty the database
        mongoose.connection.db.dropDatabase();
        const cardModel = Card({name: "Add comments"});
        cardModel.save((err, card1) => {
            if (err) {}
            card = card1;
            done()
        })
    });
    /*
    * Test the /GET/:cardId route
     */
    describe("GET/:cardId card", () => {
        it("it should not GET a card if the cardId is malformed", (done) => {
            chai.request(server)
                .get(`/api/cards/dsd5de5d25`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("The cardId dsd5de5d25 is malformed");
                    done();
                });
        });
        it("it should not GET a card if the card was not found", (done) => {
            const boardModel = Board({name: "Prello"});
            boardModel.save((err, board) => {
                if (err) {}
                chai.request(server)
                    .get(`/api/cards/${board._id}`)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.equal(`The card ${board._id} was not found`);
                        done();
                    });
            });
        });
        it("it should GET a card given a cardId", (done) => {
            chai.request(server)
                .get(`/api/cards/${card._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("name").equal("Add comments");
                    done();
                });
        });
    });
    /*
    * Test the /DELETE/:cardId route
    */
    describe("DELETE/:cardId card", () => {
        it("should DELETE the card if its closed", (done) => {
            Card.findOneAndUpdate({_id: card._id}, {
                $set: {isArchived: true}
            }, {new: true}, (error, cardArchived) => {
                if (error) {}
                chai.request(server)
                    .delete(`/api/cards/${cardArchived._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("name").equal("Add comments");
                        done()
                    });
            })
        });
        it("should NOT DELETE the card if its not archived", (done) => {
            chai.request(server)
                .delete(`/api/cards/${card._id}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`Can't delete a card not archived`);
                    done()
                });
        });
        it("should NOT DELETE the card if the cardId is malformed", (done) => {
            chai.request(server)
                .delete(`/api/cards/5de2de52`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The cardId 5de2de52 is malformed`);
                    done();
                });
        });
        it("should NOT DELETE the card if the cardId was not found", (done) => {
            const boardModel = Board({name: "Prello"});
            boardModel.save((err, board) => {
                if (err) {}
                chai.request(server)
                    .delete(`/api/cards/${board._id}`)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.equal(`The card ${board._id} was not found`);
                        done();
                    });
            })
        })
    });
});