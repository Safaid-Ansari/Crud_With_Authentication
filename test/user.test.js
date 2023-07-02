const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Replace with the path to your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe("User API", function () {
  // Test the POST /user/register endpoint
  describe("POST /user/register", function () {
    it("should register a new user", function (done) {
      chai
        .request(app)
        .post("/user/register")
        .send({
          firstName: "adil",
          lastName: "ansari",
          email: "adilansari07@gmail.com",
          password: "12345",
          confirm_password: "12345",
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body.success).to.be.true;
          expect(res.body.user).to.have.property("firstName", "adil");
          // Add more assertions as needed
          done();
        });
    });
  });

  // Test the POST /user/login endpoint
  describe("POST /user/login", function () {
    it("should log in a user", function (done) {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "suhaibansari07@gmail.com",
          password: "12345",
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property("token");
          // Add more assertions as needed
          done();
        });
    });
  });

  // Test the GET /user/welcome endpoint
  describe("GET /user/welcome", function () {
    it("should return a welcome message", function (done) {
      chai
        .request(app)
        .get("/user/welcome")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZjZjNjZjgzN2NmMTJjMjA5NTc1NyIsImlhdCI6MTY4ODI5NDg0NywiZXhwIjoxNjg4Mjk4NDQ3fQ.Hdzjdv05Y9b0HJARaidRN4sHHzIJjzaN7XKTGm2Xabg"
        )
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.equal(
            "...........Welcome Dear User............... "
          );
          done();
        });
    });
  });

  // Test the GET /user endpoint
  describe("GET /user", function () {
    it("should return a list of users", function (done) {
      chai
        .request(app)
        .get("/user")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZjZjNjZjgzN2NmMTJjMjA5NTc1NyIsImlhdCI6MTY4ODI5NDg0NywiZXhwIjoxNjg4Mjk4NDQ3fQ.Hdzjdv05Y9b0HJARaidRN4sHHzIJjzaN7XKTGm2Xabg"
        )
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          // Add more assertions as needed
          done();
        });
    });
  });

  // Test the GET /user/:id endpoint
  describe("GET /user/:id", function () {
    it("should return a specific user by ID", function (done) {
      chai
        .request(app)
        .get("/user/649fcf3cf837cf12c2095757") // Replace with a valid user ID
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZjZjNjZjgzN2NmMTJjMjA5NTc1NyIsImlhdCI6MTY4ODI5NDg0NywiZXhwIjoxNjg4Mjk4NDQ3fQ.Hdzjdv05Y9b0HJARaidRN4sHHzIJjzaN7XKTGm2Xabg"
        )
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          // Add more assertions as needed
          done();
        });
    });
  });

  // Test the PUT /user/updateUser/:id endpoint
  describe("PUT /user/updateUser/:id", function () {
    it("should update a user by ID", function (done) {
      chai
        .request(app)
        .put("/user/updateUser/649fcf3cf837cf12c2095757") // Replace with a valid user ID
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZjZjNjZjgzN2NmMTJjMjA5NTc1NyIsImlhdCI6MTY4ODI5NDg0NywiZXhwIjoxNjg4Mjk4NDQ3fQ.Hdzjdv05Y9b0HJARaidRN4sHHzIJjzaN7XKTGm2Xabg"
        )
        .send({
          firstName: "Updated",
          lastName: "User",
          email: "updated.user@example.com",
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("firstName", "Updated");
          // Add more assertions as needed
          done();
        });
    });
  });

  // Test the DELETE /user/deleteUser/:id endpoint
  describe("DELETE /user/deleteUser/:id", function () {
    it("should delete a user by ID", function (done) {
      chai
        .request(app)
        .delete("/user/deleteUser/649fcf3cf837cf12c2095757") // Replace with a valid user ID
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZjZjNjZjgzN2NmMTJjMjA5NTc1NyIsImlhdCI6MTY4ODI5NDg0NywiZXhwIjoxNjg4Mjk4NDQ3fQ.Hdzjdv05Y9b0HJARaidRN4sHHzIJjzaN7XKTGm2Xabg"
        )
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          // Add more assertions as needed
          done();
        });
    });
  });
});
