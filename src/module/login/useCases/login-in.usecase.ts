import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SingInDTO } from "../dto/sing-in.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma.service";
import {compare,} from 'bcrypt';


@Injectable()
export class SingInUseCase {

    constructor(private jwtService: JwtService, private prisma: PrismaService) {

    }

    async execute(data: SingInDTO) {


        //Validar se o username existe no banco de dados
        const user = await this.prisma.users.findFirst ({
            where: ({
                username: data.username
            })
        })
        
        //se não existir, retorna o erro
        if (!user) {
            throw new UnauthorizedException();
        }

        //Se existir, validar a senha
        await compare(data.password, user.password);

    }
}