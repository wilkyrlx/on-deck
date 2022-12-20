import { allTeams } from "../data/allTeams";
import { Sport } from "./Sport"

export interface Team {
    name: string
    iconUrl: string
    sport: Sport
}

/**
 * Slugifies a team name, i.e. {"New England Patriots", ..., ...} -> "new-england-patriots"
 * @param team - the team object to be slugified, i.e. {name: "New England Patriots", iconUrl: "https://...", sport: Sport.NFL}
 * @returns slugified team name, i.e. new-england-patriots
 */
export function slugifyTeam(team: Team): string {
    return team.name.toLowerCase().replaceAll(" ", "-");
}

/**
 * Function takes in a singular slug and returns a Team object
 * @param cookie - such as new-england-patriots
 * @returns Team object (in this case, for the New England Patriots)
 */
export function slugToTeam(slugName: string): Team {
    // we only care about the slug, so split on the cookie and take the third element
    const teamName: string = unslugifyTeamName(slugName);
    const teams:Team[] = allTeams;

    const results = teams.filter(t => t.name.toLowerCase().includes(teamName.toLowerCase()))
    return results[0];
}

/**
 * unslugifies a team name, i.e. "new-england-patriots" -> "New England Patriots"
 * @param teamName - the team name to be unslugified, i.e. new-england-patriots
 * @returns unslugified team name, i.e. New England Patriots
 */
function unslugifyTeamName(teamName: string): string {
    //capitalize first letter of each word in team
    return teamName.replaceAll("-", " ")
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}
