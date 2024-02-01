import { User } from "./user.model";

export class Studio{
    _id: any;
    name: string | undefined;
    address: string | undefined;
    founder: string | undefined;
    dateFounded: Date | undefined;
    website: URL | undefined;
    amountOfEmployees: Number | undefined;
    user?: User;
}