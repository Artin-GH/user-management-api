import User from "../../app/models/user.model";
import mongoose from 'mongoose';

describe("Post model test", () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/exp-books-api');
  });

  test("Creates a user", async () => {
    await User.create({name: 'Artin GH', email: 'artinghazizadeh86@gmail.com',
                       password: '123456'});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
