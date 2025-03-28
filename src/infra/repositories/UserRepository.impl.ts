import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { PrismaClient } from "@prisma/client";
import { User } from "@/domain/entities/User";

export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        return users.map((user) => new User({
            id: new UniqueEntityID(user.id).toString(),
            username: user.username,
            password: user.password,
        }));
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });

        return user ? new User({
            id: new UniqueEntityID(user.id).toString(),
            username: user.username,
            password: user.password,
        }) : null;
    }
    
    async findById(id: UniqueEntityID): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id: id.toString() } });

        return user ? new User({
            id: new UniqueEntityID(user.id).toString(),
            username: user.username,
            password: user.password,
        }) : null;
    }

    async save(user: User): Promise<void> {
        const userData = user.toJSON();

        const existingUser = await this.prisma.user.findUnique({
            where: { id: userData.id },
        });

        if (existingUser) {
            await this.prisma.user.update({
                where: { id: userData.id },
                data: userData,
            });
        } else {
            await this.prisma.user.create({
                data: userData,
            });
        }
    }

    async delete(id: UniqueEntityID): Promise<void> {
        await this.prisma.user.delete({ where: { id: id.toString() } });
    }

    async count(): Promise<number> {
        return this.prisma.user.count();
    }
}