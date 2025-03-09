import { Body, Controller, Post } from "@nestjs/common";
import { VaccinationService } from "./vaccinatioin.service";
@Controller('vac')
export class VaccinationController{
 constructor (private readonly vacconatioService: VaccinationService){}

 @Post('save')
 async saveVaccination(
    @Body() body: {age: number; tvaccination: string; date: Date}
){
    const{ age , tvaccination, date} = body;
    const score = await this.vacconatioService.saveVaccinationRecords();
    return score;
 }

}
