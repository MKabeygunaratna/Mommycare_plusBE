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
    

    await userRef.set(
      { title,description,date,isRecurring },
      { merge: true }
    );
     
    console.log(`Document users todo list /${title} initialized`);

   await userRef.update({
    todolistDetails : admin.firestore.FieldValue.arrayUnion({
    description,
    date,
    isRecurring
     
  }),
});

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
   const userRef = db.collection('usersT').doc(title);
   const userGet = await userRef.get();
    console.log('got the data from the firestore ', title);
   if(!userGet.exists){
     return { success: false, message: 'Title not found' };
   }

   const dataExctract = userGet.data();
 
    return {success: true, title: dataExctract?.title, date: dataExctract?.date, description: dataExctract?.description, isRecurring: dataExctract?.isRecurring};

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

    const userGet = await userRef.get(); 

    if(!userGet.exists){
      return { success: false, message: 'Title not found' };
    }
 
    await userRef.update({      
          isRecurring: isRecurring
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
 async getVaccinationRecords(vname:string){
  try{
    const userRef = db.collection('usersV').doc(vname);
    const userGet = await userRef.get();

    if(!userGet.exists){
      return { success: false, message: 'Title not found' };
    }
    const dataExctract = userGet.data();
 
    return {success: true, age: dataExctract?.age, date: dataExctract?.date, tvaccination: dataExctract?.tvaccination, vname: dataExctract?.vname};

 }catch (error) {
   console.error('Error retrieving Todo List:', error);
   return { success: false, message: error.message };
      }

 }

 async deleteVaccinationRecords(title: string){

  const userRef = db.collection('usersV').doc(title);
  console.log(`Checking document: users/${title}`);
  await userRef.delete();
  return { message: 'Task deleted successfully', title };
 }




 async sendMessage (userId: string, username: string, message: string){
  try{
  const messageData = {
    userId,
    username,
    message,
    timestamp: new Date().toISOString(),
  };
  
  const usersChat = await db.collection('ChatMsg').add(messageData);
  console.log(`Document users/${username} initialized`);

  return { success: true, message: 'chat saved successfully' };

  }catch(error){
    console.error('Error saving chat details:', error);
    return { success: false, message: error.message };
  }     
}


// async sendMessageWEb ( message: any, community: string){
//   try{
      
//   const usersChat =  db.collection('ChatMsg').doc(community);
//   console.log(`Document users/${community} initialized`);

//   await usersChat.set(
//     { messages: []},
//     { merge: true }
//   );

//   await usersChat.update({
//     messages: admin.firestore.FieldValue.arrayUnion({
//         text: message,
//     })
// });

//   return { success: true, message: 'chat saved successfully' };

//   }catch(error){
//     console.error('Error saving chat details:', error);
//     return { success: false, message: error.message };
//   }     
// }

async sendMessageWEb(message: any, community: string) {
  try {
      const usersChat = db.collection('ChatMsg').doc(community);
      console.log(`Document ChatMsg/${community} initialized`);

      // Generate timestamp separately
      const timestamp = new Date().toISOString(); 

      await usersChat.set(
          { messages: [] }, // Ensure the field exists
          { merge: true }
      );

      await usersChat.update({
          messages: admin.firestore.FieldValue.arrayUnion({
              text: message,
              timestamp: timestamp // Use the pre-generated timestamp
          })
      });

      return { success: true, message: 'Chat saved successfully' };

  } catch (error) {
      console.error('Error saving chat details:', error);
      return { success: false, message: error.message };
  }
}


}
