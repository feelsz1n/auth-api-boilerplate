import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "../entities/User";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    findById(id: UniqueEntityID): Promise<User | null>;
    save(user: User): Promise<void>;
    delete(id: UniqueEntityID): Promise<void>;
    count(): Promise<number>;
}

