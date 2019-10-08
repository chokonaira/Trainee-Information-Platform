import chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe("Auth Controller", () => {
  const defaultUser = {
    username: "choko",
    email: "choko@gmail.com",
    password: "chokoo"
  };
  it("should signup a user", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).equal("Signup successfully");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("newUser");
        expect(res.body).to.have.property("token");
        expect(res.body.newUser).to.have.property("id");
        expect(res.body.newUser).to.have.property("username");
        expect(res.body.newUser).to.have.property("email");
        done();
      });
  });

  it("should throw an error if username field is empty", done => {
    const invalidUser = {
      username: "",
      email: "choko@gmail.com",
      password: "chokoo"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(invalidUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("username");
        done();
      });
  });
  it("should throw an error if email field is empty", done => {
    const invalidUser = {
      username: "choko",
      email: "",
      password: "chokoo"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(invalidUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.have.property("email");
        done();
      });

    it("should throw an error if password field is empty", done => {
      const invalidUser = {
        username: "choko",
        email: "gmail.com",
        password: ""
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(invalidUser)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).to.have.property("password");
          done();
        });
    });
  });

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
});
