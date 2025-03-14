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

//save the todo list
async savetodolist(title:string,description: string,date: string,isRecurring :boolean){
  try {
    const userRef = db.collection('usersT').doc(title);
    console.log(`Checking document: users/${title}`);
    
    // Ensure document exists
    // await userRef.set(
    //   { title, todolistDetails: []},
    //   { merge: true }
    // );

    await userRef.set(
      { title,description,date,isRecurring },
      { merge: true }
    );
     
    console.log(`Document users todo list /${title} initialized`);

//    await userRef.update({
//     todolistDetails : admin.firestore.FieldValue.arrayUnion({
//     description,
//     date,
//     isRecurring
     
//   }),
// });

//console.log(`Todo list saved for user: ${title}`);


return { success: true, message: 'Activities have been saved successfully' };
} catch (error) {
console.error('Error saving the to do list:', error);
return { success: false, message: error.message };
       }
    }

  
// Retreive the data of the the To do List
async gettodolist(title: string){
  try{
   const userRef = db.collection('userT').doc(title);
   const userGet = await userRef.get();
  
   if(!userGet.exists){
     return { success: false, message: 'Title not found' };
   }

   const dataExctract = userGet.data();
 
    return {success: true, title: dataExctract?.title};

 }catch (error) {
   console.error('Error retrieving Todo List:', error);
   return { success: false, message: error.message };
      }
 }

//update the to do list task
   async updatetodolist(title:string, isRecurring: boolean){
    console.log('passed the data');
    const userRef = db.collection('usersT').doc(title);
    console.log(`Checking document: usersT/${title}`);
      
    
    await userRef.update({      
          isRecurring
      });

   } 


// save the vaccination records
 async saveVaccinationRecords(vname:string, age: number, tvaccination: string, date: Date){
  
  const userRef = db.collection('usersV').doc(vname);
  console.log(`Checking the collection is being created: with title ${vname}`)

  await userRef.set(
    { vname,
      age,
      tvaccination,
      date },
    { merge: true }
  );
   
 }

 async updateVaccinationRecords(){
            
 }


}
