import { Body, Controller, Delete, Param, Post, Get } from "@nestjs/common";
import { VaccinationService } from "./vaccinatioin.service";
@Controller('vac')
export class VaccinationController{
 constructor (private readonly vacconatioService: VaccinationService){}

 @Post('save')
 async saveVaccination(
    @Body() body: {vname: string;age: number; tvaccination: string; date: Date}
){
    const{ vname ,age , tvaccination, date} = body;
    const score = await this.vacconatioService.saveVaccinationRecords(vname,age , tvaccination, date);
    return score;
 }

  @Get('savedVac/:title')
   async getTasks(@Param('title') title: string) {
     return await this.vacconatioService.getvaccinationRecords(title);
   }


 @Delete('deleteVac/:title')
 async deletevaccination(@Param('title') title: string){
       const deletevac =  await this.vacconatioService.deleteVaccinationRecords(title);
       return deletevac;
   }
   
}