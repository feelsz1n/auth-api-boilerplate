import bcrypt from "bcryptjs";

export class PasswordHash {
    constructor(private readonly value: string) {}

    static create(password: string): PasswordHash {
        const hash = bcrypt.hashSync(password, 10);
        return new PasswordHash(hash);
    }

    static compare(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    getValue(): string {
        return this.value;
    }
}