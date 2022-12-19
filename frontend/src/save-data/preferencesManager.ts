import { Sport } from "../model/Sport";
import { slugToTeam, Team, teamToCookie } from "../model/Team";
import { Event } from '../model/Event'

// TODO: does not load the last added team into cookie
/**
 * load preferences into cookies
 * @param savedTeams  - array of teams to save, based on current state
 */
function loadPreferencesCookie(savedTeams: Team[]) {

    const cookieBuilder: string[] = [];
    savedTeams.forEach(team => {
        cookieBuilder.push(teamToCookie(team));
    });

	localStorage.setItem("preferences", cookieBuilder.toString())	
}

function sendPreferencesRequest() {
    // get preferences from cookies, then send a request to server
    const cookieContents: string | null = localStorage.getItem("preferences");
    
    if (cookieContents == null) {
        throw new Error("No preferences cookie found");
    }

    const cookieList: string[] = cookieContents.split(",");

    cookieList.forEach(cookie => {
        // send request to server
        const sport = cookie.split("|")[0];
        const league = cookie.split("|")[1];
        const teamSlug = cookie.split("|")[2];

        // TODO: fetch request to server
    });

}

export type eventsJSON = {
    result: string;
    displayName: string;
    homeSlug: string;
    awaySlug: string;
    startTime: string;
    endTime: string;
    sport: string;
};

function generateEvent(rawEvent: eventsJSON) {
    const eventName: string = rawEvent.displayName;
    const homeTeam: Team = slugToTeam(rawEvent.homeSlug);
    const awayTeam: Team = slugToTeam(rawEvent.awaySlug);
    const startTime: Date = new Date(rawEvent.startTime);
    const endTime: Date = new Date(rawEvent.endTime);
    var sport: Sport
    switch (rawEvent.sport) {
        case "NFL": sport = Sport.NFL; break;
        case "NBA": sport = Sport.NBA; break;
        case "NHL": sport = Sport.NHL; break;  
        case "MLB": sport = Sport.MLB; break;    
        default:
            sport = Sport.NFL;
        };

}

const x = new Event(
    "test1",
    { name: "Pittsburgh Steelers", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/pit.png", sport: Sport.NFL },
    { name: "Pittsburgh Steelers", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/pit.png", sport: Sport.NFL },
    addHours(new Date(), 1),
    addHours(new Date(), 3),
    Sport.NFL
)

function addHours(date: Date, hours: number) {
    var copiedDate = new Date(date.getTime());
    copiedDate.setHours(copiedDate.getHours() + hours);
    return copiedDate;
}

export { loadPreferencesCookie, sendPreferencesRequest}