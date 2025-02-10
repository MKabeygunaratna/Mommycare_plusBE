// import * as admin from 'firebase-admin';
// const serviceAccount = require('../../firebase-service-account.json'); // Use require here


var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});




export const db = admin.firestore(); // Export the Firestore instance
