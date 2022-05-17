'use strict';
import * as admin from 'firebase-admin';

const serviceAccount = require('../configs/files/project-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
