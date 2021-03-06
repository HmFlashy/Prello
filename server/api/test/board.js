//During the test the env variable is set to test
const List = require("../models/index").List;
const Board = require("../models/index").Board;
const User = require("../models/index").User;
const Team = require("../models/index").Team;
const mongoose = require("mongoose");
require("../../config/db");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let team = null;
let user = null;
let board = null;
let header = null;
let hugoUser = null;

describe("Board", () => {
    before((done) => {
        User.findOne({ email: "hugo.maitre69@gmail.com" }).then((hugo) => {
            hugoUser = hugo;
            chai.request(server)
                .post(`/api/login`)
                .send({ "email": "hugo.maitre69@gmail.com", "password": "m" })
                .end((err, res) => {
                    if (err) {
                        console.log("An error as occurred " + error);
                        process.exit(-1)
                    }
                    header = `Bearer ${res.body.token}`;
                    done()
                })
        });
    });

    beforeEach((done) => { // Before each test we empty the database
        User.deleteMany({ name: "Testeur" }).then(() => {
            Team.deleteMany().then(() => {
                Board.deleteMany().then(() => {
                    User.create({ name: "Testeur" }).then(user1 => {
                        user = user1;
                        Team.create({ name: "TeamTest" }).then(team1 => {
                            team = team1;
                            Board.create({
                                name: "BoardTest",
                                members: [{ member: hugoUser._id, role: "Admin" }]
                            }).then(board1 => {
                                board = board1;
                            }).then(() => {
                                done();
                            })
                        });
                    });
                })
            })
        }).catch(error => {
            console.log("An error as occurred " + error);
            process.exit(-1)
        })
    });
    /*
    * Test the /GET route
     */
    describe("GET board", () => {
        it("it should GET all the boards in the database", (done) => {
            chai.request(server)
                .get("/api/boards")
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.length(1);
                    done();
                });
        });
    });
    /*
    * Test the /GET/:boardId route
     */
    describe("GET/:boardId board", () => {
        it("it should not GET a board if the boardId is malformed", (done) => {
            chai.request(server)
                .get(`/api/boards/dsd5de5d25`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("it should not GET a board if the board was not found", (done) => {
            chai.request(server)
                .get(`/api/boards/${user._id}`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it("it should GET a board given a boardId", (done) => {
            chai.request(server)
                .get(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("name").equal("BoardTest");
                    done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe("POST board", () => {
        it("it should not POST a board without name field", (done) => {
            chai.request(server)
                .post("/api/boards")
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("it should not POST a board without visibility field", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({ name: "Doing" })
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("it should POST a board with the given name and user and update the user", (done) => {
            chai.request(server)
                .post("/api/boards/")
                .set("Authorization", header)
                .send({ name: "Prello", visibility: "Private" })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("Prello");
                    res.body.should.have.property("owner").equal(hugoUser._id.toString());
                    User.findById(hugoUser._id).find({ boards: { "$in": [{ board: res.body._id, role: "Admin", category: null }] } }, (err, user) => {
                        expect(user);
                        done();
                    });
                });
        });
        it("it should not POST a board if the team was not found", (done) => {
            chai.request(server)
                .post("/api/boards")
                .set("Authorization", header)
                .send({ name: "Prello", visibility: "Private", teamId: user._id })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it("it should POST a board with the given name, user and team and update both the user and the team", (done) => {
            chai.request(server)
                .post("/api/boards/")
                .set("Authorization", header)
                .send({ name: "Prello", visibility: "Private", teamId: team._id })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("Prello");
                    res.body.should.have.property("owner").equal(hugoUser._id.toString());
                    User.findById(hugoUser._id).find({ boards: { "$in": [{ board: res.body._id, role: "Admin", category: null }] } }, (err, user) => {
                        expect(user);
                        Team.findById(team._id).find({ boards: { "$in": [res.body._id] } }, (err, team) => {
                            expect(team);
                            done();
                        })
                    });
                });
        });
    });
    /*
    * Test the /PUT/:boardId route
    */
    describe("PUT/:boardId board", () => {
        it("should UPDATE the board if nothing is inside the body is given", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should UPDATE the name of the board", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({ name: "ADcare" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("ADcare");
                    done()
                });
        });
        it("should UPDATE the isClosed of the board", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({ isClosed: true })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("isClosed").equal(true);
                    done()
                });
        });
        it("should UPDATE the visibility of the board", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({ visibility: "Public" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("visibility").equal("Public");
                    done()
                });
        });
        it("should NOT UPDATE the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52`)
                .set("Authorization", header)
                .send({ name: "ADcare" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT UPDATE the board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}`)
                .set("Authorization", header)
                .send({ name: "ADcare" })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        })
    });
    /*
    * Test the /PUT/:boardId/members route
    */
    describe("PUT/:boardId/members board", () => {
        it("should ADD the member to the board given its id", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .set("Authorization", header)
                .send({ userId: user._id })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.members[1].should.have.property("role").equal("Member");
                    res.body.members[1].should.have.property("member");
                    res.body.members[1].member._id.should.equal(user._id.toString());
                    User.findById(user._id).find({
                        boards: {
                            "$in": [{
                                board: res.body._id,
                                role: "Member"
                            }]
                        }
                    }, (err, user) => {
                        expect(user);
                        done();
                    });
                });
        });
        it("should NOT ADD a member to the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52/members`)
                .set("Authorization", header)
                .send({ userId: user._id })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT ADD a member to board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}/members`)
                .set("Authorization", header)
                .send({ userId: user._id })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it("should NOT ADD a member to board if the userId for the user is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .set("Authorization", header)
                .send({ userId: "frfrfrr552" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT ADD a member to board if the user was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .set("Authorization", header)
                .send({ userId: board._id })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /*
    * Test the /PUT/:boardId/teams route
    */
    describe("PUT/:boardId/teams board", () => {
        it("should ADD the team to the board given its id", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/teams`)
                .set("Authorization", header)
                .send({ teamId: team._id })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    expect(res.body.teams.includes(team._id));
                    Team.findById(team._id).find({ boards: { "$in": [res.body._id] } }, (err, team) => {
                        expect(team);
                        done();
                    });
                });
        });
        it("should NOT ADD a team to the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52/teams`)
                .set("Authorization", header)
                .send({ teamId: team._id })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT ADD a team to board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${team._id}/teams`)
                .set("Authorization", header)
                .send({ teamId: team._id })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it("should NOT ADD a team to board if the teamId for the team is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/teams`)
                .set("Authorization", header)
                .send({ teamId: "frfrfrr552" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT ADD a team to board if the team was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}/teams`)
                .set("Authorization", header)
                .send({ teamId: board._id })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /*
    * Test the /PUT/:boardId route
    */
    describe("PUT/:boardId board", () => {
        it("should UPDATE the name of the board", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({ name: "ADcare" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("ADcare");
                    done()
                });
        });
        it("should UPDATE the isClosed of the board", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({ isClosed: true })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("isClosed").equal(true);
                    done()
                });
        });
        it("should UPDATE the visibility of the board", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .send({ visibility: "Public" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("visibility").equal("Public");
                    done()
                });
        });
        it("should NOT UPDATE the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52`)
                .set("Authorization", header)
                .send({ name: "ADcare" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT UPDATE the board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}`)
                .set("Authorization", header)
                .send({ name: "ADcare" })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        })
    });

    /*
    * Test the /DELETE/:boardId route
    */
    describe("DELETE/:boardId board", () => {
        it("should DELETE the board", (done) => {
            const members = board.members;
            const teams = board.teams;
            chai.request(server)
                .delete(`/api/boards/${board._id}`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("BoardTest");
                    Board.findById(res.body._id, (error, newBoard) => {
                        expect(newBoard).to.be.null;
                        members.forEach(boardMember => {
                            const member = boardMember.member;
                            User.findOne({
                                _id: member._id,
                                "boards.board": board._id
                            }, (user) => expect(user).to.be.null)
                        });
                        teams.forEach(team => {
                            Team.findOne({ _id: team._id, boards: { $in: [board._id] } }, (team) =>
                                expect(team).to.be.null
                            )
                        });
                        done()
                    })
                });
        });
        it("should NOT DELETE the board if the boardId is malformed", (done) => {
            chai.request(server)
                .delete(`/api/boards/5de2de52`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should NOT DELETE the board if the boardId was not found", (done) => {
            chai.request(server)
                .delete(`/api/boards/${user._id}`)
                .set("Authorization", header)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        })
    });
});