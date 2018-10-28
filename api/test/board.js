//During the test the env variable is set to test
const List = require("../models/index").List;
const Board = require("../models/index").Board;
const User = require("../models/index").User;
const Team = require("../models/index").Team;
const mongoose = require("mongoose")
require("../config/db");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let team = null
let user = null
let board = null

describe("Board", () => {
    beforeEach((done) => { // Before each test we empty the database
        mongoose.connection.db.dropDatabase();
        User.create({name: "Loris"}, (err, user1) => {
            user = user1
            Team.create({name: "Khal"}, (err, team1) => {
                team = team1
                Board.create({name: "Prello"}, (err, board1) => {
                    board = board1
                    done()
                })
            });
        });
    })
    /*
    * Test the /GET route
     */
    describe("GET board", () => {
        it("it should GET all the boards in the database", (done) => {
            chai.request(server)
                .get("/api/boards")
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
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("The boardId dsd5de5d25 is malformed");
                    done();
                });
        });
        it("it should not GET a board if the board was not found", (done) => {
            chai.request(server)
                .get(`/api/boards/${user._id}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The board ${user._id} was not found`);
                    done();
                });
        });
        it("it should GET a board given a boardId", (done) => {
            chai.request(server)
                .get(`/api/boards/${board._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("name").equal("Prello");
                    done();
                });
        });
    })
    /*
    * Test the /POST route
    */
    describe("POST board", () => {
        it("it should not POST a board without name field", (done) => {
            chai.request(server)
                .post("/api/boards")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("Missing name parameter");
                    done();
                });
        });
        it("it should not POST a board without visibility field", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({name: "Doing"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("Missing visibility parameter");
                    done();
                });
        });
        it("it should not POST a board without userId field", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({name: "Doing", visibility: "private"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("Missing userId parameter");
                    done();
                });
        });
        it("it should not POST a board if the userId is malformed", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({name: "Prello", visibility: "private", userId: "dsd5de5d25"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("The userId dsd5de5d25 is malformed");
                    done();
                });
        });
        it("it should not POST a board if the user was not found", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({name: "Prello", visibility: "private", userId: team._id})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The user ${team._id} was not found`);
                    done();
                });
        });
        it("it should POST a board with the given name and user and update the user", (done) => {
            chai.request(server)
                .post("/api/boards/")
                .send({name: "Prello", visibility: "private", userId: user._id})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("Prello");
                    res.body.should.have.property("owner").equal(user._id.toString());
                    User.findById(user._id).find({boards: {"$in": [{board: res.body._id, role: "Admin"}]}}, (err, user) => {
                        if (err) {}
                        expect(user);
                        done();
                    });
                });
        });
        it("it should not POST a board if the teamId is malformed", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({name: "Prello", visibility: "private", userId: user._id, teamId: "dede52565"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal("The teamId dede52565 is malformed");
                    done();
                });
        });
        it("it should not POST a board if the team was not found", (done) => {
            chai.request(server)
                .post("/api/boards")
                .send({name: "Prello", visibility: "private", userId: user._id, teamId: user._id})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The team ${user._id} was not found`);
                    done();
                });
        });
        it("it should POST a board with the given name, user and team and update both the user and the team", (done) => {
            chai.request(server)
                .post("/api/boards/")
                .send({name: "Prello", visibility: "private", userId: user._id})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").equal("Prello");
                    res.body.should.have.property("owner").equal(user._id.toString());
                    User.findById(user._id).find({boards: {"$in": [{board: res.body._id, role: "Admin"}]}}, (err, user) => {
                        if (err) {}
                        expect(user)
                        Team.findById(team._id).find({boards: {"$in": [res.body._id]}}, (err, team) => {
                            if (err) {}
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
                .send({name: "ADcare"})
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
                .send({isClosed: true})
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
                .send({visibility: "public"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("visibility").equal("public");
                    done()
                });
        });
        it("should NOT UPDATE the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52`)
                .send({name: "ADcare"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The boardId 5de2de52 is malformed`);
                    done();
                });
        });
        it("should NOT UPDATE the board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}`)
                .send({name: "ADcare"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The board ${user._id} was not found`);
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
                .send({_id: user._id})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.members[0].should.have.property("role").equal("Member");
                    res.body.members[0].should.have.property("member").equal(user._id.toString());
                    User.findById(user._id).find({boards: {"$in": [{board: res.body._id, role: "Member"}]}}, (err, user) => {
                        if (err) {}
                        expect(user);
                        done();
                    });
                });
        });
        it("should ADD the member to the board given its email", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .send({email: user.email})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.members[0].should.have.property("role").equal("Member");
                    res.body.members[0].should.have.property("member").equal(user._id.toString());
                    User.findById(user._id).find({boards: {"$in": [{board: res.body._id, role: "Member"}]}}, (err, user) => {
                        if (err) {}
                        expect(user);
                        done();
                    });
                });
        });
        it("should NOT ADD a member to the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52/members`)
                .send({email: user.email})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The boardId 5de2de52 is malformed`);
                    done();
                });
        });
        it("should NOT ADD a member to board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}/members`)
                .send({email: user.email})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The board ${user._id} was not found`);
                    done();
                });
        })
        it("should NOT ADD a member to board if the _id for the user is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .send({_id: "frfrfrr552"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The userId frfrfrr552 is malformed`);
                    done();
                });
        })
        it("should NOT ADD a member to board if the user was not founds", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}/members`)
                .send({email: "example@ggg.com"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The user {"email":"example@ggg.com"} was not found`);
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
                .send({_id: team._id})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    expect(res.body.teams.includes(team._id))
                    Team.findById(team._id).find({boards: {"$in": [res.body._id]}}, (err, team) => {
                        if (err) {}
                        expect(team);
                        done();
                    });
                });
        });
        it("should ADD the team to the board given its name", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .send({email: user.email})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    expect(res.body.teams.includes(team._id))
                    Team.findById(team._id).find({boards: {"$in": [res.body._id]}}, (err, team) => {
                        if (err) {}
                        expect(team);
                        done();
                    });
                });
        });
        it("should NOT ADD a member to the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52/members`)
                .send({email: user.email})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The boardId 5de2de52 is malformed`);
                    done();
                });
        });
        it("should NOT ADD a member to board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}/members`)
                .send({email: user.email})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The board ${user._id} was not found`);
                    done();
                });
        })
        it("should NOT ADD a member to board if the _id for the team is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/${board._id}/members`)
                .send({_id: "frfrfrr552"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The userId frfrfrr552 is malformed`);
                    done();
                });
        })
        it("should NOT ADD a member to board if the team was not founds", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}/members`)
                .send({email: "example@ggg.com"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The user {"email":"example@ggg.com"} was not found`);
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
                .send({name: "ADcare"})
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
                .send({isClosed: true})
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
                .send({visibility: "public"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("visibility").equal("public");
                    done()
                });
        });
        it("should NOT UPDATE the board if the boardId is malformed", (done) => {
            chai.request(server)
                .put(`/api/boards/5de2de52`)
                .send({name: "ADcare"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The boardId 5de2de52 is malformed`);
                    done();
                });
        });
        it("should NOT UPDATE the board if the boardId was not found", (done) => {
            chai.request(server)
                .put(`/api/boards/${user._id}`)
                .send({name: "ADcare"})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.equal(`The board ${user._id} was not found`);
                    done();
                });
        })
    });
});