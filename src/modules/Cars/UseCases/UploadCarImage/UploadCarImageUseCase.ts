import { inject, injectable } from "tsyringe";

import { IUploadCarImageDTO } from "@modules/Cars/DTOs/IUploadCarImageDTO";
import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, image_name }: IUploadCarImageDTO): Promise<void> {
    image_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
