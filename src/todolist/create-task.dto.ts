import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';


export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsBoolean()
  isRecurring: boolean;
}
