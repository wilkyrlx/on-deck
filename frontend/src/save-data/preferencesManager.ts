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
function loadPreferencesCookie(): Team[] {
    // get preferences from cookies, then send a request to server
    let cookieContents: string | null = localStorage.getItem("preferences");
    
    console.log(`loading preferences, cookieContents = ${cookieContents}`)

    if (cookieContents == null) return []

    const cookieList: string[] = cookieContents.split(",");
    console.log(`cookieList = ${cookieList}`)

    let teams: Team[] = [];

    cookieList.forEach(slug => {
        const team = slugToTeam(slug);
        if(team != undefined) teams.push(team);        
    });

    return teams;
}




export { savePreferencesCookie, loadPreferencesCookie}