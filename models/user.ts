import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!']
  },
  username: {
    type: String,
    unique: [true, 'Username already exists!'],
    match: [/^([0-9]+[a-zA-Z]|[a-zA-Z]+[0-9]|[a-zA-Z])+$/, 'Username is invalid']
  },
  image: {
    type: String
  }
});

const User =  models.User ?? model('User', userSchema);

export default User;
