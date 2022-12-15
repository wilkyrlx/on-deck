import { Team } from "../model/Team";
import { getCookie, setCookie } from "./cookieManager";

function loadPreferencesCookie(savedTeams: Team[]) {
    // load preferences into cookies
	// TODO: add a tostring override for team[]
	setCookie("preferences", savedTeams.length.toString())	
}

function sendPreferencesRequest() {
    // get preferences from cookies, then send a request to server
    const cookieContents: string = getCookie("preferences");
}

export { loadPreferencesCookie, sendPreferencesRequest}