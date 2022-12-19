import { leagueToSport, Sport, sportToString } from "../model/Sport";
import {  slugToTeam, Team, teamToCookie } from "../model/Team";
import { Event } from '../model/Event'
import { allTeams } from "../data/allTeams";

// TODO: does not load the last added team into cookie
/**
 * load preferences into cookies
 * @param savedTeams  - array of teams to save, based on current state
 */
function savePreferencesCookie(savedTeams: Team[]) {

    const cookieBuilder: string[] = [];
    savedTeams.forEach(team => {
        cookieBuilder.push(teamToCookie(team));
    });

	localStorage.setItem("preferences", cookieBuilder.toString())	
}

function loadPreferencesCookie() {
    // get preferences from cookies, then send a request to server
    let cookieContents: string | null = localStorage.getItem("preferences");
    
    if (cookieContents == null) {
        cookieContents = "";
    }

    const cookieList: string[] = cookieContents.split(",");
    let teams: Team[] = [];

    cookieList.forEach(slug => {
        const team = slugToTeam(slug);
        teams.push(team);
    });

    return teams;
}




export { savePreferencesCookie, loadPreferencesCookie}