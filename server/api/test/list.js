//During the test the env variable is set to test
const List = require("../models/index").List;
const Board = require("../models/index").Board;
const Card = require("../models/index").Card;
const User = require("../models/index").User;
require("../../config/db");
const mongoose = require("mongoose");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let board1 = null;
let header = null;
let hugoUser = null;

describe("Lists", () => {
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
        let array = [];
        array.push(Board.deleteMany());
        array.push(List.deleteMany());
        Promise.all(array).then(() => {
            const boardModel = Board({name: "Prello", members: [{member: hugoUser._id, role: "Admin"}]});
            boardModel.save((err, board) => {
                board1 = board;
                done()
            })
        }).catch(error => {
            console.log("An error as occurred " + error);
            process.exit(-1)
        });
    });

    /*
    * Test the /POST route
    */
    describe("POST list", () => {
        it("it should not POST a list without boardId", (done) => {
            chai.request(server)
                .post("/api/lists")
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("it should not POST a list without boardId field", (done) => {
            chai.request(server)
                .post("/api/lists")
                .set("Authorization", header)
                .send({boardId: board1._id})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("it should POST a list with the given name and update the board", (done) => {
            chai.request(server)
                .post("/api/lists/")
                .set("Authorization", header)
                .send({name: "Doing", boardId: board1._id, pos: 10000})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("Doing");
                    res.body.should.have.property("board").equal(board1._id.toString());
                    Board.findById(board1._id).find({lists: {"$in": [res.body._id]}}, (err, board) => {
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
        it("should UPDATE the name of the list given the id and the new name", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                chai.request(server)
                    .put(`/api/lists/${list._id}`)
                    .set("Authorization", header)
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
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                chai.request(server)
                    .put(`/api/lists/${list._id}`)
                    .set("Authorization", header)
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
            let list = new List({name: "Doing", board: board1._id});
            list.save(() => {
                chai.request(server)
                    .put("/api/lists/52d5e1d52")
                    .set("Authorization", header)
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });

        it("should return a 404 not found if the given id doesn't exist", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save(() => {
                chai.request(server)
                    .put(`/api/lists/${board1._id}`)
                    .set("Authorization", header)
                    .send({name: "To Do"})
                    .end((err, res) => {
                        res.should.have.status(404);
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
                board1.lists = [list._id];
                board1.save(() => {
                    chai.request(server)
                        .delete("/api/lists/52d5e1d52")
                        .set("Authorization", header)
                        .end((err, res) => {
                            res.should.have.status(400);
                            done();
                        });
                });
            })
        });

        it("should return a 404 not found if the given id doesn't exist", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                board1.lists = [list._id];
                board1.save(() => {
                    chai.request(server)
                        .delete(`/api/lists/${board1._id}`)
                        .set("Authorization", header)
                        .end((err, res) => {
                            res.should.have.status(404);
                            done();
                        });
                });
            });
        });

        it("should return a 400 bad request if the list is not archived", (done) => {
            let list = new List({name: "Doing", board: board1._id});
            list.save((err, list) => {
                board1.lists = [list._id];
                board1.save(() => {
                    chai.request(server)
                        .delete(`/api/lists/${list._id}`)
                        .set("Authorization", header)
                        .end((err, res) => {
                            res.should.have.status(400);
                            done();
                        });
                });
            })
        });

        it("should DELETE the list with the given id", (done) => {
            let list = new List({name: "Doing", board: board1._id, isArchived: true});
            list.save((err, list) => {
                board1.lists = [list._id];
                board1.save(() => {
                    chai.request(server)
                        .delete(`/api/lists/${list._id}`)
                        .set("Authorization", header)
                        .end((err, res) => {
                            res.should.have.status(200);
                            Board.findById(board1._id).find({lists: {"$in": [list._id]}}, (err, board) => {
                                board.should.be.empty;
                                done();
                            });
                        });
                });
            })
        })
    })
});