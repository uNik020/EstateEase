import { emit } from "process";

export class User{

    userId: number;
    email : string;
    password :string;
    username: string;
    phone: string;
    createdAt: string;
    updatedAt:string;

    constructor(
        userId: number,
        email : string,
        password :string,
        username: string,
        phone: string,
        createdAt: string,
        updatedAt:string
    )
    {
        this.userId=userId;
        this.username=username;
        this.email=email;
        this.password=password;
        this.phone=phone;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
}