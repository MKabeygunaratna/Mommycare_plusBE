import * as admin from 'firebase-admin';
const serviceAccount = require('../../firebase-service-account.json'); // Use require here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore(); // Export the Firestore instance
