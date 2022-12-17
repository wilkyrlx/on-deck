import { allTeams } from "../data/allTeams";
import { leagueToSport, Sport, sportToString } from "./Sport"

export interface Team {
    name: string
    iconUrl: string
    sport: Sport
}

export function teamToCookie(team: Team): string {
    return `${leagueToSport(team.sport)}|${sportToString(team.sport)}|${slugifyTeam(team)}`;
}

/**
 * Function takes in a singular cookie string (i.e. "football|NFL|new-england-patriots") and returns a Team object
 * @param cookie - such as "football|NFL|new-england-patriots"
 * @returns Team object (in this case, for the New England Patriots)
 */
export function cookieToTeam(cookie: string): Team {
    // we only care about the slug, so split on the cookie and take the third element
    const slugName: string = cookie.split("|")[2];
    const teamName: string = unslugifyTeamName(slugName);
    const teams:Team[] = allTeams;

    const results = teams.filter(t => t.name.toLowerCase().includes(teamName.toLowerCase()))
    return results[0];
}


export function slugifyTeam(team: Team): string {
    return team.name.toLowerCase().replace(" ", "-");
}

function unslugifyTeamName(team: string): string {
    //capitalize first letter of each word in team
    return team.replaceAll("-", " ")
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}
