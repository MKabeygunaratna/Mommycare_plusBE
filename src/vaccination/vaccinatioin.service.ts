import { Injectable } from "@nestjs/common";
import { FirebaseService } from "src/firebase/firebase.service";

@Injectable()
export class VaccinationService{

 constructor(private readonly firebaseService: FirebaseService) {}


  async saveVaccinationRecords(vname:string, age: number, tvaccination: string, date: Date){
        try {
            return await this.firebaseService.saveVaccinationRecords(vname,age,tvaccination,date);
        } catch (error) {
            console.error('Error saving the vaccination records');
<<<<<<< HEAD
            return {sucess:false,message:'Error saving the vaccination records'}
        }
  }

   async getvaccinationRecords(vname:string){
     try{
        return await this.firebaseService.getVaccinationRecords(vname);
     }catch(error){
        console.error('Error getting the vaccination Records');
        return{sucess: false,message: 'Error getting the vaccination records'}
     }
   }

      async deleteVaccinationRecords(title: string){
        try {
            return await this.firebaseService.deleteVaccinationRecords(title);
        } catch (error) {
            console.error('Error saving the vaccination records');
            return {sucess:false,message:'Error saving the vaccination result'}
        }
      }

=======
            return {sucess:false,message:'Error saving the vaccination result'}
        }
  }
>>>>>>> 5ce7c73ab8f106def5b7c494fee55bbe72555a1b
}