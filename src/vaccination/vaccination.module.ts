
import { Module } from "@nestjs/common";
import { VaccinationController } from "./vaccination.controller";
import { VaccinationService } from "./vaccinatioin.service";
import { FirebaseModule } from '../firebase/firebase.module';


@Module({
      imports: [FirebaseModule],
      controllers: [VaccinationController],
      providers: [VaccinationService],
})
export class VaccinationModule{}