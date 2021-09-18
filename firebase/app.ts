import * as admin from 'firebase-admin';

const credentials = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

const database = admin.firestore();

export default database;
