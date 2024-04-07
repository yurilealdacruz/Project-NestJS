import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { CreateUserDTO } from "./dto/user.dto";
import { CreateUserValidationPipe } from "./pipe/create-user.validation.pipe";
import { AuthGuard } from "src/infra/providers/auth-guard.provider";
import { ProfileUserUseCase } from "./useCases/profile-user.usecase";
import { CreateUserResponseSchemaDTO, CreateUserSchemaDTO } from "./schemas/create-user.schema";


@Controller('/users')
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase, private readonly ProfileUserUseCase: ProfileUserUseCase) {

    }

    @Post()
    //@UsePipes(new CreateUserValidationPipe())
    async create(@Body() data: CreateUserSchemaDTO) {
        const user = await this.createUserUseCase.execute(data);
        return CreateUserResponseSchemaDTO.safeParse(user)
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    async profile(@Request() req) {
        return this.ProfileUserUseCase.execute(req.user.sub)
    }

}