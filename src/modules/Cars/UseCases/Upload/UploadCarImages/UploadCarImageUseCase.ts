import { inject, injectable } from "tsyringe";

import { IUploadCarImageDTO } from "@modules/Cars/DTOs/IUploadCarImageDTO";
import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, image_name }: IUploadCarImageDTO): Promise<void> {
    image_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "car");
    });
  }
}
