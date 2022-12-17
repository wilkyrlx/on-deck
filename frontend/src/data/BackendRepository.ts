import {averageGameLength, Sport} from "../model/Sport";
import {Event} from "../model/Event";
import {EventsRepository} from "./EventsRepository";
import {slugifyTeam, Team} from "../model/Team";
import {allTeams} from "./allTeams";
import {addHours} from "./mock";

const API_URL = "http://localhost:3232"
export class BackendRepository implements EventsRepository {
    getEvents(teamPreferences: Team[]): Promise<Event[]> {
        const requestPromises: Promise<Event[]>[] = teamPreferences.map(team => {
            const requestURL = API_URL + `/sports?sport=${sportToSportString(team.sport)}&league=${sportToLeagueString(team.sport)}&team=${slugifyTeam(team)}`
            return fetch(requestURL)
                .then(r => r.json())
                .then(response => response.eventList.map(responseEvent => {
                    const homeTeam = allTeams.find(t => t.name == responseEvent.homeTeam)
                    const awayTeam = allTeams.find(t => t.name == responseEvent.awayTeam)
                    const startTime = new Date(Date.parse(responseEvent.startTime))
                    const endTime = addHours(startTime, averageGameLength(homeTeam.sport))
                    return new Event(responseEvent.id, homeTeam, awayTeam, startTime, endTime, homeTeam.sport)
                }))
        })
        const combined: Promise<Event[][]> = Promise.all(requestPromises)
        return combined.then(responses => responses.flatMap(r => r))
    }
    getHighlightGames(teamPreferences: Team[]): Promise<Event[]> {
        return new Promise(resolve => setTimeout(resolve, 400))
        .then(() => [])
    }
}

function sportToSportString(sport: Sport) {
    switch (sport) {
        case Sport.NFL: return "football"
        case Sport.NBA: return "basketball"
        case Sport.NHL: return "hockey"
        case Sport.MLB: return "baseball"
    }
}

function sportToLeagueString(sport: Sport) {
    switch (sport) {
        case Sport.NFL: return "nfl"
        case Sport.NBA: return "nba"
        case Sport.NHL: return "nhl"
        case Sport.MLB: return "mlb"
    }
}