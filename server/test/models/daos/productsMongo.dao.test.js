import chai from "chai";
import mongoose from "mongoose";
import Users from "../../src/dao/Users.dao.js";
import userModel from "../../src/dao/models/User.js";

mongoose.connect('mongodb+srv://jorelmaro:coder123house456@coder.3c0d1.mongodb.net/demopb40?retryWrites=true&w=majority');
const expect = chai.expect;

describe('Users DAO Unit Test cases', function () {
  this.timeout(5000);

  before(function () {
    this.usersDao = new Users();
  });

  beforeEach(async function () {
    await userModel.deleteMany();
  });

  it('get method should return a empty users array', async function () {
    const result = await this.usersDao.get();
    expect(result).deep.equal([]);
  });

  it('should adds a user to DB correctly', async function () {
    const testUser = {
      first_name: "Jhon",
      last_name: "Doe",
      email: "test@email.com",
      password: "super-secret-password"
    };
    const result = await this.usersDao.save(testUser);
    expect(result).to.have.property('_id');
    expect(result.first_name).to.be.equal(testUser.first_name);
  });

  it('should adds a user to DB correctly and that user should have an empty pets array', async function () {
    const testUser = {
      first_name: "Jhon",
      last_name: "Doe",
      email: "test@email.com",
      password: "super-secret-password"
    };
    const result = await this.usersDao.save(testUser);
    expect(result.pets).deep.equal([]);
  });

  it('should gets a user by their email', async function () {
    const testUser = {
      first_name: "Jhon",
      last_name: "Doe",
      email: "test@email.com",
      password: "super-secret-password"
    };
    const result = await this.usersDao.save(testUser);
    const user = await this.usersDao.getBy({ email: "test@email.com" });
    expect(result).to.have.property('_id');
    expect(user.email).to.be.equal(result.email);
  });

  it('should updates a user sucessfully', async function () {
    const testUser = {
      first_name: "Jhon",
      last_name: "Doe",
      email: "test@email.com",
      password: "super-secret-password"
    };
    const result = await this.usersDao.save(testUser);
    expect(result).to.have.property('_id');
    expect(result.first_name).to.be.equal("Jhon");
    expect(result.last_name).to.be.equal("Doe");

    await this.usersDao.update(result._id, {
      first_name: "Juan",
      last_name: "Nebbia"
    });

    const user = await this.usersDao.getBy({ _id: result._id });

    expect(user.first_name).to.be.equal("Juan");
    expect(user.last_name).to.be.equal("Nebbia");
  });

  it('should deletes a user sucessfully', async function () {
    const testUser = {
      first_name: "Jhon",
      last_name: "Doe",
      email: "test@email.com",
      password: "super-secret-password"
    };
    const result = await this.usersDao.save(testUser);
    expect(result).to.have.property('_id');

    await this.usersDao.delete(result._id);

    const user = await this.usersDao.getBy({ _id: result._id });

    expect(user).to.be.equal(null);
  });

  after(async function () {
    await userModel.deleteMany();
  })
});