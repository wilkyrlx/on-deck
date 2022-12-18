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

    // Returns time range as a string, date first and then time range in hours and minutes
    dateTimeRange(): string {
        return this.startTime.toLocaleTimeString([], {month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})  + " - " + this.endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }

    timeRange(): string {
        return this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})  + " - " + this.endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }
}