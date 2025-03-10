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
            return {sucess:false,message:'Error saving the vaccination result'}
        }
  }
}