const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
// const baseUrl = "http://hit-activity-tracking-backend.herokuapp.com"
const baseUrl = "localhost:5000"

chai.use(chaiHttp);

describe("Workout APIs", function(){
    it('Fetching workouts', function(done) {
            chai.request(baseUrl)
            .get('/workout')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
        })
})

describe("Trainer APIs", function(){
    it('Fetching Trainers', function(done) {
            chai.request(baseUrl)
            .get('/trainer')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
        })
    it('Fetching One Trainer', function(done) {
        chai.request(baseUrl)
        .get('/trainer/ZJDF4WmdKPPNCqEBzCXu8P0raUB2')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
        });
    })
    it('Fetching Client List Of Trainer', function(done) {
        chai.request(baseUrl)
        .get('/trainer/subscribers/ZJDF4WmdKPPNCqEBzCXu8P0raUB2')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
        });
    })
})


describe("Routine APIs", function(){
    it('Fetching Routine', function(done) {
            chai.request(baseUrl)
            .get('/routine/ZJDF4WmdKPPNCqEBzCXu8P0raUB2')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
        })
})

