import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUserUseCase } from "./AuthUserUseCase";

export class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);

    const token = await authUserUseCase.execute({ email, password });

    return response.status(200).json(token);
  }
}
