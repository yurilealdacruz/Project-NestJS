import { PrismaService } from "src/infra/database/prisma.service";
import { UsernameAndEmail, UserCreatedDTO, CreateUserDTO } from "../../dto/user.dto";
import { IUserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserPrismaRepository implements    IUserRepository {

    constructor(private prisma: PrismaService) {}

    async findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO | null> {
          return await this.prisma.users.findFirst({
            where : {
                OR : [ {username: data.username} , {email: data.email} ]
            }
        });

    }
    async save(data: CreateUserDTO): Promise<UserCreatedDTO> {
        return await this.prisma.users.create({ 
            data,
        })
    }

    async findByUsername(username: string) : Promise<UserCreatedDTO | null> {
        return await this.prisma.users.findUnique({
            where: {
                username,
            }
        })
    }

    async findById(id: string) : Promise<UserCreatedDTO | null> {
        return this.prisma.users.findUnique({
            where: {id}
        });
    }
}