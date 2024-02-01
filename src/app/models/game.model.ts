import { Console } from "./console.model";
import { Studio } from "./studio.model";
import { User } from "./user.model";

export enum Genre {
    Action = 'Action',
    Action_Adventure = 'Action-Adventure',
    Adventure = 'Adventure',
    Horror = 'Horror',
    Idle = 'Idle',
    MMO = 'MMO',
    RPG = 'RPG',
    Simulation = 'Simulation',
    Singleplayer = 'Singleplayer',
    Strategy = 'Strategy',
    Sports = 'Sports',
    Survival = 'Survival'
}

export class Game {
    public _id: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public releaseDate: string | undefined;
    public genre: Genre = Genre.Action;
    public studio: Studio | undefined;
    public console: Console[] | undefined;
    public user?: User;
}