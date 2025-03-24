import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationController } from './vaccination.controller';
import { VaccinationService } from './vaccinatioin.service';

describe('VaccinationController', () => {
  let controller: VaccinationController;
  let vaccinationService: VaccinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationController],
      providers: [
        {
          provide: VaccinationService,
          useValue: {
            saveVaccinationRecords: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VaccinationController>(VaccinationController);
    vaccinationService = module.get<VaccinationService>(VaccinationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('saveVaccination', () => {
    it('should call vaccinationService.saveVaccinationRecords with the correct parameters', async () => {
      // Arrange
      const vaccinationData = {
        vname: 'Baby Smith',
        age: 6,
        tvaccination: 'Hepatitis B',
        date: new Date('2023-05-15')
      };
      
      const expectedResponse = {
        success: true,
        message: 'Vaccination record saved successfully',
        id: 'vac123'
      };
      
      jest.spyOn(vaccinationService, 'saveVaccinationRecords').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.saveVaccination(vaccinationData);
      
      // Assert
      expect(vaccinationService.saveVaccinationRecords).toHaveBeenCalledWith(
        vaccinationData.vname,
        vaccinationData.age,
        vaccinationData.tvaccination,
        vaccinationData.date
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the vaccination service', async () => {
      // Arrange
      const vaccinationData = {
        vname: 'Invalid Name',
        age: -1, // Invalid age
        tvaccination: 'Hepatitis B',
        date: new Date('2023-05-15')
      };
      
      const error = new Error('Invalid vaccination data');
      jest.spyOn(vaccinationService, 'saveVaccinationRecords').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.saveVaccination(vaccinationData)).rejects.toThrow(error);
      expect(vaccinationService.saveVaccinationRecords).toHaveBeenCalledWith(
        vaccinationData.vname,
        vaccinationData.age,
        vaccinationData.tvaccination,
        vaccinationData.date
      );
    });
  });
});