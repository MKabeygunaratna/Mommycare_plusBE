import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebase-service-account.json'; // Adjust the path to your JSON file

// Explicitly cast the imported JSON to the correct type
const serviceAccountConfig = serviceAccount as admin.ServiceAccount;

// Initialize Firebase Admin with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
});

// Firestore instance
const db = admin.firestore();

export class FirebaseService {

  // Save Quiz Result to Firestore
  async saveQuizResult(userId: string, answers: string[], score: number, isDepressed: boolean) {
    try {
      const userRef = db.collection('users').doc(userId);
      console.log(`Checking document: users/${userId}`);

      // Ensure document exists
      await userRef.set(
        { userId, quizResults: [] },
        { merge: true }
      );

      console.log(`Document users/${userId} initialized`);


      // Add quiz result
      await userRef.update({
        quizResults: admin.firestore.FieldValue.arrayUnion({
          answers,
          score, 
        }), 
      });

      console.log(`Quiz result saved for user: ${userId}`);
      return { success: true, message: 'Quiz result saved successfully' };
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return { success: false, message: error.message };
    }
  }

  // Retrieve Quiz Results for a user
  async getQuizResults(userId: string) {
    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return { success: false, message: 'User not found' };
      }

      const data = userDoc.data();
      return { success: true, quizResults: data?.quizResults || [] };
    } catch (error) {
      console.error('Error retrieving quiz results:', error);
      return { success: false, message: error.message };
    }
  }
}
