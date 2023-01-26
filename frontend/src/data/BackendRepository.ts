import {averageGameLength, Sport} from "../model/Sport";
import {Event} from "../model/Event";
import {EventsRepository} from "./EventsRepository";
import {slugifyTeam, Team} from "../model/Team";
import {allTeams} from "./allTeams";
import {addHours} from "./mock";

// TODO: change this to be equal to the backend's base url
const API_URL = "https://us-central1-on-deck-375716.cloudfunctions.net"
export class BackendRepository implements EventsRepository {
    getEvents(teamPreferences: Team[]): Promise<Event[]> {
        const requestPromises: Promise<Event[]>[] = teamPreferences.map(team => {
            const requestURL = API_URL + `/sports?sport=${sportToSportString(team.sport)}&league=${sportToLeagueString(team.sport)}&team=${slugifyTeam(team)}`
            const responsePromise: Promise<Event[]> = fetch(requestURL)
                .then(r => r.json())
                .then(response => {
                    if (response.result == "error_bad_request") return []
                    const eventList: BackendEvent[] = response.eventList
                    return eventList.map(backendEvent => backendEventToEvent(backendEvent))
                })
            return responsePromise
        })
        const combined: Promise<Event[][]> = Promise.all(requestPromises)
        const allGames: Promise<Event[]> = combined.then(responses => responses.flatMap(r => r))
        .then(ag => { console.log(`backend found allGames = {JSON.stringify(ag)}`); return ag})
        return allGames
    }
    getHighlightGames(teamPreferences: Team[]): Promise<Event[]> {
        const requestURL = API_URL + `/important?count=3`
        const responsePromise: Promise<Event[]> = fetch(requestURL)
                .then(r => r.json())
                .then(response => {
                    if (response.result == "error_bad_request") return []
                    const eventList: BackendEvent[] = response.eventList
                    console.log(`backend found highlightGames = ${JSON.stringify(eventList)}`)
                    return eventList.map(backendEvent => backendEventToEvent(backendEvent))
                })
        return responsePromise;

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

interface BackendEvent {
    "link": string,
    "name": string,
    "id": string,
    "date": string,
    "homeTeamName": string,
    "awayTeamName": string,
}

function backendEventToEvent(backendEvent: BackendEvent): Event {
    const homeTeam = allTeams.find(t => t.name === backendEvent.homeTeamName)
    const awayTeam = allTeams.find(t => t.name === backendEvent.awayTeamName)
    if(homeTeam === undefined) throw new Error(`could not find team name = ${backendEvent.homeTeamName}`)
    if(awayTeam === undefined) throw new Error(`could not find team name = ${backendEvent.awayTeamName}`)
    const startTime = new Date(Date.parse(backendEvent.date))
    const endTime = addHours(startTime, averageGameLength(homeTeam.sport))
    return new Event(backendEvent.id, homeTeam, awayTeam, startTime, endTime, homeTeam.sport)
}