// models/user.ts
import { Schema, model } from 'mongoose';

// Define User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  salt: { type: String, select: false },
  authentication: {
    sessionToken: { type: String, select: false },  // Ensure it's part of the schema
  },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
});

// Create and export the User model
export const User = model('User', userSchema);

export const getUserBySessionToken = ( sessionToken : string) => User.findOne({'authentication.sessionToken': sessionToken})
export const getUserById = (id: string) => User.findById(id);
//create new user in db
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
//delete user from db
export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id });
//update user
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate({ id,values })



