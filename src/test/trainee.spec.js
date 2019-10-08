import chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

let token;

describe("Trainee Controller", () => {
  const existingUser = {
    email: "choko@gmail.com",
    password: "chokoo"
  };
  it("should login a user", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send(existingUser)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        expect(res.body.message).equal("Login Successful");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("existingUser");
        expect(res.body).to.have.property("token");
        expect(res.body.existingUser).to.have.property("id");
        expect(res.body.existingUser).to.have.property("username");
        done();
      });
  });

  it("should create a new trainee record", done => {
    const trainee = {
      firstname: "moses",
      lastname: "cane",
      email: "moses@gmail.com",
      stack: "Ruby"
    };
    chai
      .request(app)
      .post("/api/v1/trainees/add")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).equal("Trainee Record successfully created");
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id");
        expect(res.body.data).to.have.property("firstname");
        expect(res.body.data).to.have.property("email");
        expect(res.body.data).to.have.property("lastname");
        expect(res.body.data).to.have.property("stack");
        expect(res.body.data).to.have.property("startDate");
        done();
      });
  });

  it("should throw an error if firstname field is empty", done => {
    const trainee = {
      firstname: "",
      lastname: "cane",
      email: "moses@gmail.com",
      stack: "Ruby"
    };
    chai
      .request(app)
      .post("/api/v1/trainees/add")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("firstname");
        done();
      });
  });
  it("should throw an error if lastname field is empty", done => {
    const trainee = {
      firstname: "moses",
      lastname: "",
      email: "moses@gmail.com",
      stack: "Ruby"
    };
    chai
      .request(app)
      .post("/api/v1/trainees/add")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("lastname");
        done();
      });
  });
  it("should throw an error if email field is empty", done => {
    const trainee = {
      firstname: "moses",
      lastname: "cane",
      email: "",
      stack: "Ruby"
    };
    chai
      .request(app)
      .post("/api/v1/trainees/add")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("email");
        done();
      });
  });
  it("should throw an error if stack field is empty", done => {
    const trainee = {
      firstname: "moses",
      lastname: "cane",
      email: "moses@gmail.com",
      stack: ""
    };
    chai
      .request(app)
      .post("/api/v1/trainees/add")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("stack");
        done();
      });
  });
  it("should edit an existing trainee record", done => {
    const trainee = {
      firstname: "moses",
      lastname: "cane",
      email: "moses@gmail.com",
      stack: "Ruby"
    };
    chai
      .request(app)
      .patch("/api/v1/trainees/edit/J2Py1RH")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).equal("Trainee with this ID does not exist");
        done();
      });
  });

  it("should throw an error if firstname field is empty", done => {
    const trainee = {
      firstname: "",
      lastname: "cane",
      email: "moses@gmail.com",
      stack: "Ruby"
    };
    chai
      .request(app)
      .patch("/api/v1/trainees/edit/J2Py1RHlN")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("firstname");
        done();
      });
  });
  it("should throw an error if lastname field is empty", done => {
    const trainee = {
      firstname: "moses",
      lastname: "",
      email: "moses@gmail.com",
      stack: "Ruby"
    };
    chai
      .request(app)
      .patch("/api/v1/trainees/edit/J2Py1RHlN")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("lastname");
        done();
      });
  });
  it("should throw an error if email field is empty", done => {
    const trainee = {
      firstname: "moses",
      lastname: "cane",
      email: "",
      stack: "Ruby"
    };
    chai
      .request(app)
      .patch("/api/v1/trainees/edit/J2Py1RHlN")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("email");
        done();
      });
  });
  it("should throw an error if stack field is empty", done => {
    const trainee = {
      firstname: "moses",
      lastname: "cane",
      email: "moses@gmail.com",
      stack: ""
    };
    chai
      .request(app)
      .patch("/api/v1/trainees/edit/J2Py1RHlN")
      .send(trainee)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("stack");
        done();
      });
  });
  it("should fetch all trainee record", done => {
    chai
      .request(app)
      .get("/api/v1/trainees")
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).equal("All Trainee records retrieved succesfully");
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        expect(res.body.data[0]).to.have.property("id");
        expect(res.body.data[0]).to.have.property("firstname");
        expect(res.body.data[0]).to.have.property("email");
        expect(res.body.data[0]).to.have.property("lastname");
        expect(res.body.data[0]).to.have.property("stack");
        expect(res.body.data[0]).to.have.property("startDate");
        done();
      });
  });

});
