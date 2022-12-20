import {  slugifyTeam, slugToTeam, Team } from "../model/Team";

/**
 * load preferences into localStorage
 * @param savedTeams  - array of teams to save, based on current state
 */
function savePreferencesCookie(savedTeams: Team[]) {

    const cookieBuilder: string[] = [];
    savedTeams.forEach(team => {
        cookieBuilder.push(slugifyTeam(team));
    });

	localStorage.setItem("preferences", cookieBuilder.toString())	
}

/**
 * Reads from localStorage and returns an array of teams
 * @returns array of teams from cookie
 */
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