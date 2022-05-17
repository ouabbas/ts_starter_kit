import { model, Schema, Document } from 'mongoose';
import { User } from '~interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
    uppercase: true,
  },
  pushToken: String,
  firebaseUID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
