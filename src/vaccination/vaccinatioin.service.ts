import { Injectable } from "@nestjs/common";
import { FirebaseService } from "src/firebase/firebase.service";

@Injectable()
export class VaccinationService{
 constructor(private readonly firebaseService: FirebaseService) {}

  async saveVaccinationRecords(){
        try {
            return await this.firebaseService.saveVaccinationRecords();
        } catch (error) {
            
        }
  }
}