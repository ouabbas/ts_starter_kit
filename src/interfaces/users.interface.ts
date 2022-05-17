import { Document } from 'mongoose';

export type UserDocument = User & Document;
export interface User {
  _id: string;
  referralCode: string;
  pushToken: string;
  email: string;
  firebaseUID: string;
  createdAt: Date;
}
