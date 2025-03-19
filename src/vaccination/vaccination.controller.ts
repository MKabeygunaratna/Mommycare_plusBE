<<<<<<< HEAD
import { Body, Controller, Delete, Param, Post, Get } from "@nestjs/common";
=======
import { Body, Controller, Post } from "@nestjs/common";
>>>>>>> 5ce7c73ab8f106def5b7c494fee55bbe72555a1b
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

<<<<<<< HEAD
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
=======
}
>>>>>>> 5ce7c73ab8f106def5b7c494fee55bbe72555a1b
