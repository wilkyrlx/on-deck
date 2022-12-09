import { Sport } from "./Sport";
import {Team} from "./Team";

export class Event {
    constructor(
        public id: string,
        public homeTeam: Team,
        public awayTeam: Team,
        public startTime: Date,
        public endTime: Date,
        public sport: Sport,
    ) {
    }

    title(): string {
        return this.homeTeam.name + " vs. " + this.awayTeam.name
    }
}