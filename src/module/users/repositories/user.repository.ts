import { CreateUserDTO, UserCreatedDTO, UsernameAndEmail } from "../dto/user.dto";



export abstract class IUserRepository {
    abstract findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO | null>;
    abstract save(data: CreateUserDTO): Promise<UserCreatedDTO>;

    abstract findById(id: string): Promise<UserCreatedDTO | null>;
}