import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { SingInDTO } from "./dto/sing-in.dto";
import { SingInUseCase } from "./useCases/login-in.usecase";



@Controller()
export class LoginController {

    constructor(private singInUseCase: SingInUseCase) {}

    @Post('/signIn')
    async signIn(@Body() signInDTO: SingInDTO) {
        const token = await this.singInUseCase.execute(signInDTO);
        return token;
    }
}   