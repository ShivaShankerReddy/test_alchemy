const assert = require('assert');
const expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


const router = require('../router/index');
// let server = require('../app');
var server = 'localhost:3000';


chai.use(chaiHttp);

// beforeEach((done) => {
//     router.remove({}, (err) => {
//        done();
//     });
// });
describe("/signup", () => {
    describe("email test cases:   ", () => {
        describe("without @ symbol", () => {
            it("it should raise email error", (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    email: 'ssddsddsd',
                    name: 'sdsdsddsds',
                    password: 'wwedddsss'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
        describe("without email", () => {
            it('it should raise email error', (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    name: '3343fffdfdf',
                    password: 'dfdfdfffdff'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
    describe("name test cases:   ", () => {
        describe("without name", () => {
            it('it should raise name error', (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    email: 'fdfdfdf@gmail',
                    password: '23232332dsds'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
    describe("password test cases:  ", () => {
        describe("without password", () => {
            it('it should raise password error', (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    email: 'sdfdfdfdfff@email.com',
                    name: 'ddsddsdsdsds'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
        describe("without any parameters", () => {
            it('it should raise all error', (done) => {
                chai.request(server)
                .post('/signup')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
    describe("positive test cases:   ", () => {
        describe("with all parameters", () => {
            it('no errors', (done) => {
                chai.request(server)
                .post('/signup').send({
                    name: 'eerererreer',
                    password: 'wewewe43ddd',
                    email: "dfdffffdf@gmail.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
});


describe("/login", () => {
    describe("postive cases", () => {
        it("no errors", (done) => {
            chai.request(server)
            .post('/login')
            .send({
                email: "sdsdsdsds@gmail.com",
                password: "dfdfdfdfd"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property('token');
                done();
            });
        });
    });
    describe("email test cases:   ", () => {
        describe("without @ symbol", () => {
            it("it should raise email error", (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    email: 'ssddsddsd',
                    name: 'sdsdsddsds',
                    password: 'wwedddsss'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
        describe("without email", () => {
            it('it should raise email error', (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    name: '3343fffdfdf',
                    password: 'dfdfdfffdff'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
    describe("password test cases:  ", () => {
        describe("without password", () => {
            it('it should raise password error', (done) => {
                chai.request(server)
                .post('/signup')
                .send({
                    email: 'sdfdfdfdfff@email.com',
                    name: 'ddsddsdsdsds'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
        describe("without any parameters", () => {
            it('it should raise all error', (done) => {
                chai.request(server)
                .post('/signup')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
});


// describe("/logout", () => {
//     describe("user logged out successfully", () => {
//         it("it should logged out user", (done) => {
//             chai.request(server)
//             .put('/logout')
//             .send({
//                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZHNmZGZkZmRmZGYiLCJpYXQiOjE2Mjc2MjUyNzAsImV4cCI6MTYyNzYzMjQ3MH0.dUkQF0aNwowyBbqafgVuvAe2lZdc15FTCc_oP0Ifzo8"
//             })
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });
//         });
//     });
// });


describe("token test cases ", () => {
    describe("token missing", () => {
        it("invalid token error", (done) => {
            chai.request(server)
            .post('/news')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
        });
    });
    describe("token missing out error", () => {
        it("token missing error", (done) => {
            chai.request(server)
            .post('/news')
            .send({
                token: 'fdfdfdfffdddfdfdrererefffd'
            })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });
});

describe("weather api", () => {
    describe("without location", () => {
        it("hardcoded value", (done) => {
            chai.request(server)
            .get('/weather')
            .end((err, res) => {
                res.should.have.status(400);
                res.should.have.be.a('object');
                done();
            });
        });
    });
    describe("with location", () => {
        it("passing location values", (done) => {
            chai.request(server)
            .get('/weather?lat=25.39242&long=68.373657')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('data');
                res.should.have.be.a('object');
                res.body.data.should.have.a('array');
                done();
            });
        });
    });
    describe("with string location", () => {
        it("invalid location values", (done) => {
            chai.request(server)
            .get('/weather?lat=rr.39rr2&long=68.373657')
            .end((err, res) => {
                res.should.have.status(400);
                res.should.have.be.a('object');
                done();
            });
        });
    });
});


// describe("news api", () => {
//     describe("with authentication", () => {
//         it("it should fail", (done) => {
//             chai.request(server)
//             .post('/news')
//             .send({
//                 search: 'india',
//                 token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZHNmZGZkZmRmZGYiLCJpYXQiOjE2Mjc2MzU2MzUsImV4cCI6MTYyNzY0MjgzNX0.zLr8Z0PN1xQ1pNfqlUCnyh2kF465aXE86xIt3wM-Cp8'
//             })
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.should.have.be.a('object');
//                 res.body.should.have.property('data');
//                 done();
//             });
//         });
//     });
    describe("without authentication", () => {
        it("it should fail", (done) => {
            chai.request(server)
            .post('/news')
            .send({
                search: 'india'
            })
            .end((err, res) => {
                res.should.have.status(403);
                res.should.have.be.a('object');
                done();
            });
        });
    });
});