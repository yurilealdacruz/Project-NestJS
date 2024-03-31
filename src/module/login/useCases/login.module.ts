import { Module } from "@nestjs/common";
import { LoginController } from "../login.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { SingInUseCase } from "./login-in.usecase";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [JwtModule.register({
        global: true,
        secret: 'NestJS6',
        signOptions: {expiresIn: '60s'},
    })],
    controllers : [LoginController],
    providers: [PrismaService, SingInUseCase],

})

export class LoginModule{}