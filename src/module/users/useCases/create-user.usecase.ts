import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateUserDTO } from "../dto/user.dto";



@Injectable()
export class CreateUserUseCase {

    constructor(private prisma: PrismaService) {}

    async execute(data: CreateUserDTO) {
        const user = await this.prisma.users.findFirst({
            where : {
                OR : [ {username: data.username} , {email: data.email} ]
            }
        });

        if (user) {
            throw new Error('User Already exists!');
        }

        return await this.prisma.users.create({
            data,
        });
    }
}