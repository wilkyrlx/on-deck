import { Team, teamToCookie } from "../model/Team";
import { getCookie, setCookie } from "./cookieManager";

/**
 * load preferences into cookies
 * @param savedTeams  - array of teams to save, based on current state
 */
function loadPreferencesCookie(savedTeams: Team[]) {

    const cookieBuilder: string[] = [];
    savedTeams.forEach(team => {
        cookieBuilder.push(teamToCookie(team));
    });

	setCookie("preferences", cookieBuilder.toString())	
}

function sendPreferencesRequest() {
    // get preferences from cookies, then send a request to server
    const cookieContents: string = getCookie("preferences");
}

export { loadPreferencesCookie, sendPreferencesRequest}