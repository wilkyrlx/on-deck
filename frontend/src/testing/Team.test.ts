import { Sport } from "../model/Sport";
import { slugifyTeam, slugToTeam, Team } from "../model/Team"

// NOTE: for slug testing, we are expecting strings to come in certain shapes due to ESPN convention
// therefore, not all edge cases are considered simply because they are not possible in the current implementation

test('slugifyTeam basic use testing', () => {
    const exampleTeam: Team = { name: "Cleveland Browns", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cle.png", sport: Sport.NFL };
    expect(slugifyTeam(exampleTeam)).toBe('cleveland-browns')

    //multiple words
    const exampleTeam2: Team = { name: "New England Patriots", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ne.png", sport: Sport.NFL };
    expect(slugifyTeam(exampleTeam2)).toBe('new-england-patriots')

    const exampleTeam3: Team = { name: "New York Giants", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png", sport: Sport.NFL };
    expect(slugifyTeam(exampleTeam3)).toBe('new-york-giants')
})

test('slugifyTeam edge case testing', () => {
    const edgeTeam: Team = { name: "NEW YORK", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png", sport: Sport.NFL };
    expect(slugifyTeam(edgeTeam)).toBe('new-york')

    const edgeTeam2: Team = { name: "Los Angeles Rams", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png", sport: Sport.NFL };
    expect(slugifyTeam(edgeTeam2)).toBe('los-angeles-rams')

    const edgeTeam3: Team = { name: "test", iconUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png", sport: Sport.NFL };
    expect(slugifyTeam(edgeTeam3)).toBe('test')
})


test('slugToTeam basic use testing', () => {
    const exampleTeam: string = "cleveland-browns";
    expect(slugToTeam(exampleTeam)!!.name).toBe('Cleveland Browns')
    expect(slugToTeam(exampleTeam)!!.sport).toBe(Sport.NFL)

    const exampleTeam2: string = "new-england-patriots";
    expect(slugToTeam(exampleTeam2)!!.name).toBe('New England Patriots')
    expect(slugToTeam(exampleTeam2)!!.sport).toBe(Sport.NFL)

    const exampleTeam3: string = "new-york-giants";
    expect(slugToTeam(exampleTeam3)!!.name).toBe('New York Giants')
    expect(slugToTeam(exampleTeam3)!!.sport).toBe(Sport.NFL)
})