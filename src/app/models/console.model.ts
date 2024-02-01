import { User } from "./user.model";

export class Console{
    _id: any;
    name: string | undefined;
    amountOfUser: number | undefined;
    dateOfRelease: Date | undefined;
    website: URL | undefined;
    user?: User;
}