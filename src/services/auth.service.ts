import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { HttpException } from '~exceptions/HttpException';
import { User } from '~interfaces/users.interface';
import userModel from '~models/users.model';
import { generateOne, Charset, charset } from 'referral-codes';
import fb from '~utils/firebase-admin';

class AuthService {
  public users = userModel;

  login = async (token: string, fcmToken?: string): Promise<User> => {
    const decodedToken: any = await fb.auth().verifyIdToken(token);
    if (!decodedToken) {
      throw new HttpException(400, `Sorry, invalid or expired token`);
    }

    const firebaseUID: string = decodedToken.user_id;
    const loggedUser = await this.users.findOne({ firebaseUID: firebaseUID });
    if (loggedUser) {
      loggedUser.pushToken = fcmToken;
      await loggedUser.save();
      return loggedUser;
    }

    const newUser = new this.users();

    newUser.firebaseUID = firebaseUID;
    newUser.email = decodedToken.email;

    let referralCode: string;
    do {
      referralCode = generateOne({ pattern: '########', charset: charset(Charset.ALPHANUMERIC), prefix: '', postfix: '' } as any);
    } while (await this.users.exists({ referralCode }));
    newUser.referralCode = referralCode;

    if (fcmToken) newUser.pushToken = fcmToken;

    await newUser.save();
    return newUser;
  };

  logout = (userId: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.users.findByIdAndUpdate(userId, { $unset: { pushToken: 1 } });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default AuthService;
