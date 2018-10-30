//During the test the env variable is set to test
const List = require("../models/index").List;
const Board = require("../models/index").Board;
const Card = require("../models/index").Card;
require("../../config/db");
const mongoose = require('mongoose')

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let board1 = null;

describe("Lists", () => {
    beforeEach((done) => { // Before each test we empty the database
        mongoose.connection.db.dropDatabase();
        const boardModel = Board({name: "Prello"});
        boardModel.save((err, board) => {
            if (err) {}
            board1 = board;
            done()
        })
    });

    /*
    * Test the /POST route
    */
    describe("POST list", () => {
        it("it should not POST a list without name field", (done) => {
            chai.request(server)
                .post("/api/lists")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message").eql("Missing name parameter");
                    done();
                });
        });
        it("it should not POST a list without boardId field", (done) => {
            chai.request(server)
                .post("/api/lists")
                .send({name: "Doing"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message").equal("Missing boardId parameter");
                    done();
                });
        });

        it("it should POST a list with the given name and update the board", (done) => {
            chai.request(server)
                .post("/api/lists/")
                .send({name: "Doing", boardId: board1._id})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("Doing");
                    res.body.should.have.property("board").equal(board1._id.toString());
                    Board.findById(board1._id).find({lists: {"$in": [res.body._id]}}, (err, board) => {
                        if (err) {}
                        expect(board);
                        done();
                    });
                });
        });
    });

    /*
    * Test the /PUT/:listId route
    */
    describe("PUT/:listId list", () => {
        it("should UPDATE the list if nothing inside the body is given", (done) => {
            let list = new List({name: "Doing", boardId: board1._id});
            list.save((err, list) => {
                chai.request(server)
                    .put(`/api/lists/${list._id}`)
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        done();
                    });
            });
        });

        it("should UPDATE the name of the list given the id and the new name", (done) => {
            let list = new List({name: "Doing", boardId: board1._id});
            list.save((err, list) => {
                chai.request(server)
                    .put(`/api/lists/${list._id}`)
                    .send({name: "Done"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("name").eql("Done");
                        done();
                    });
            });
        });

        it("should UPDATE the isArchived parameter of the list given the id and the new value", (done) => {
            let list = new List({name: "Doing", boardId: board1._id});
            list.save((err, list) => {
                chai.request(server)
                    .put(`/api/lists/${list._id}`)
                    .send({isArchived: true})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("isArchived").eql(true);
                        done();
                    });
            });
        });

        it("should return a 400 bad request if the id is not an object Id", (done) => {
            let list = new List({name: "Doing", boardId: board1._id});
            list.save((err, list) => {
                if (err) {}
                chai.request(server)
                    .put("/api/lists/52d5e1d52")
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.equal("The listId 52d5e1d52 is malformed");
                        done();
                    });
            });
        });

        it("should return a 404 not found if the given id doesn't exist", (done) => {
            let list = new List({name: "Doing", boardId: board1._id});
            list.save((err, list) => {
                if (err) {}
                chai.request(server)
                    .put(`/api/lists/${board1._id}`)
                    .send({name: "To Do"})
                    .end((err, res) => {
                        console.log(JSON.stringify(res))
                        res.should.have.status(404);
                        res.body.should.equal(`The listId ${board1._id} was not found`);
                        done();
                    });
            });
        });
    });

    /*
    * Test the /DELETE/:listId route
     */
    describe("DELETE/:listId list", () => {
        it("should return a 400 bad request if the given id is not an object Id", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                if (err) {}
                board1.lists = [list._id];
                board1.save((err) => {
                    if (err) {}
                    chai.request(server)
                        .delete("/api/lists/52d5e1d52")
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.equal("The listId 52d5e1d52 is malformed");
                            done();
                        });
                });
            })
        })

        it("should return a 404 not found if the given id doesn't exist", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                if (err) {}
                board1.lists = [list._id];
                board1.save((err) => {
                    if (err) {}
                    chai.request(server)
                        .delete(`/api/lists/${board1._id}`)
                        .end((err, res) => {
                            res.should.have.status(404);
                            res.body.should.equal(`The listId ${board1._id} was not found`);
                            done();
                        });
                });
            });
        });

        it("should return a 400 bad request if the list is not archived", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                if (err) {}
                board1.lists = [list._id];
                board1.save((err) => {
                    if (err) {}
                    chai.request(server)
                        .delete(`/api/lists/${list._id}`)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.equal("Can't delete a list not archived");
                            done();
                        });
                });
            })
        })

        it("should return a 400 bad request if the list is not empty", (done) => {
            let card = new Card({name: "card name"});
            card.save((err, card) => {
                let list = new List({
                    name: "Doing",
                    board: board1._id,
                    cards: [card._id],
                    isArchived: true
                });
                list.save((err, list) => {
                    if (err) {}
                    board1.lists = [list._id];
                    board1.save((err) => {
                        if (err) {}
                        chai.request(server)
                            .delete(`/api/lists/${list._id}`)
                            .end((err, res) => {
                                res.should.have.status(400);
                                res.body.should.equal("Can't delete a list not empty");
                                done();
                            });
                    })
                })
            })
        });

        it("should DELETE the list with the given id", (done) => {
            let list = new List({name: "Doing", board: board1._id, isArchived: true});
            list.save((err, list) => {
                if (err) {}
                board1.lists = [list._id];
                board1.save((err) => {
                    if (err) {}
                    chai.request(server)
                        .delete(`/api/lists/${list._id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            Board.findById(board1._id).find({lists: {"$in": [list._id]}}, (err, board) => {
                                if (err) {}
                                board.should.be.empty;
                                done();
                            });
                        });
                });
            })
        })
    })
});