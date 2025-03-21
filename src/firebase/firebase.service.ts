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

  getDb() {
    return db;
  }

  // Save Quiz Result to Firestore
  async saveQuizResult(userId: string, answers: number[], score: number) {
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

  // Save Todo List
  async savetodolist(title: string, description: string, date: string, isRecurring: boolean) {
    try {
      const todoRef = db.collection('todolists').doc(title);
      console.log(`Checking document: todolists/${title}`);

      await todoRef.set(
        { title, description, date, isRecurring },
        { merge: true }
      );

      console.log(`Document todolists/${title} initialized`);
      return { success: true, message: 'Todo list saved successfully' };
    } catch (error) {
      console.error('Error saving the todo list:', error);
      return { success: false, message: error.message };
    }
  }

  // Retrieve Todo List data
 // Retrieve all Todo List data
async gettodolistcheck() {
  try {
    const snapshot = await db.collection('todolists').get();

    if (snapshot.empty) {
      return { success: false, message: 'No todo lists found' };
    }

    const todoLists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { success: true, todoLists };
  } catch (error) {
    console.error('Error retrieving todo lists:', error);
    return { success: false, message: error.message };
  }
}


  // Update Todo List task
  async updatetodolist(title: string, isRecurring: boolean) {
    try {
      const todoRef = db.collection('todolists').doc(title);
      console.log(`Updating document: todolists/${title}`);

      await todoRef.update({ isRecurring });

      console.log(`Todo list updated for: ${title}`);
      return { success: true, message: 'Todo list updated successfully' };
    } catch (error) {
      console.error('Error updating todo list:', error);
      return { success: false, message: error.message };
    }
  }

  // Save Vaccination Records
  async saveVaccinationRecords(vname: string, age: number, tvaccination: string, date: Date) {
    try {
      const vaccinationRef = db.collection('vaccinations').doc(vname);
      console.log(`Checking vaccination record for: ${vname}`);

      await vaccinationRef.set(
        { vname, age, tvaccination, date },
        { merge: true }
      );

      console.log(`Vaccination record saved for: ${vname}`);
      return { success: true, message: 'Vaccination record saved successfully' };
    } catch (error) {
      console.error('Error saving vaccination record:', error);
      return { success: false, message: error.message };
    }
  }

  // Send a Chat Message
  async sendMessage(userId: string, username: string, message: string) {
    try {
      const messageData = {
        userId,
        username,
        message,
        timestamp: new Date().toISOString(),
      };

      const chatRef = await db.collection('ChatMsg').add(messageData);
      console.log(`Message saved to ChatMsg for user: ${username}`);

      return { success: true, message: 'Message saved successfully' };
    } catch (error) {
      console.error('Error saving chat message:', error);
      return { success: false, message: error.message };
    }
  }

  // Send a Chat Message to a Community
  async sendMessageWeb(message: any, community: string) {
    try {
      const communityRef = db.collection('ChatMsg').doc(community);
      console.log(`Checking community: ChatMsg/${community}`);

      const timestamp = new Date().toISOString(); // Generate timestamp separately

      await communityRef.set(
        { messages: [] }, // Ensure the field exists
        { merge: true }
      );

      await communityRef.update({
        messages: admin.firestore.FieldValue.arrayUnion({
          text: message,
          timestamp: timestamp, // Use the pre-generated timestamp
        }),
      });

      return { success: true, message: 'Message saved to community successfully' };
    } catch (error) {
      console.error('Error saving message to community:', error);
      return { success: false, message: error.message };
    }
  }
}
