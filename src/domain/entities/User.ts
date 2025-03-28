import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface UserProps {
  id?: string;
  username: string;
  password: string;
}

export class User {
  public readonly id: UniqueEntityID;
  public readonly props: UserProps;

  constructor(props: UserProps, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID();
    this.props = {
      ...props,
      id: props.id,
    };
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  toJSON() {
    return {
      id: this.id.toString(),
      username: this.username,
      password: this.password,
    };
  }
}