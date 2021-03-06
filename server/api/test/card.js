//During the test the env variable is set to test
const Card = require("../models/index").Card;
const User = require("../models/index").User;
const Board = require("../models/index").Board;
require("../../config/db");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
let card = null;
let hugoUser = null;
let header = null;

describe("Board", () => {
    before((done) => {
        User.findOne({email: "hugo.maitre69@gmail.com"}).then((hugo) => {
            hugoUser = hugo;
            chai.request(server)
                .post(`/api/login`)
                .send({"email": "hugo.maitre69@gmail.com", "password": "m"})
                .end((err, res) => {
                    if (err) {
                        console.log("An error as occurred " + error);
                        process.exit(-1)
                    }
                    header = `Bearer ${res.body.token}`;
                    done()
                })
        })
    });

    beforeEach((done) => { // Before each test we empty the database
        Board.deleteMany().then(() => {
            Card.deleteMany().then(() => {
                Board.create({
                    name: "BoardTest",
                    members: [{member: hugoUser._id, role: "Admin"}]
                }).then(board => {
                    const cardModel = Card({name: "Add comments", board: board._id});
                    cardModel.save((err, card1) => {
                        card = card1;
                        done()
                    })
                })
            })
        }).catch(error => {
            console.log("An error as occurred " + error);
            process.exit(-1)
        })
    });
    /*
    * Test the /GET/:cardId route
     */
    describe("GET/:cardId card", () => {
        it("it should not GET a card if the cardId is malformed", (done) => {
            chai.request(server)
                .get(`/api/cards/dsd5de5d25`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("it should not GET a card if the card was not found", (done) => {
            const boardModel = Board({name: "Prello"});
            boardModel.save((err, board) => {
                chai.request(server)
                    .get(`/api/cards/${board._id}`)
                    .set("Authorization", header)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });
        it("it should GET a card given a cardId", (done) => {
            chai.request(server)
                .get(`/api/cards/${card._id}`)
                .set("Authorization", header)
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
                chai.request(server)
                    .delete(`/api/cards/${cardArchived._id}`)
                    .set("Authorization", header)
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
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done()
                });
        });
        it("should NOT DELETE the card if the cardId is malformed", (done) => {
            chai.request(server)
                .delete(`/api/cards/5de2de52`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT DELETE the card if the cardId was not found", (done) => {
            const boardModel = Board({name: "Prello"});
            boardModel.save((err, board) => {
                chai.request(server)
                    .delete(`/api/cards/${board._id}`)
                    .set("Authorization", header)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            })
        })
    });
});