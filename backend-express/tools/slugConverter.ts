// Use this code to generate a map of team slugs to team IDs

async function teamIDConverter() {
    const LEAGUE_LIST = ["football/nfl", "baseball/mlb", "basketball/nba", "hockey/nhl"];
    const teamIDMap: any[] = [];
    const API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
    
        const requestURL: string = API_URL_STUB + LEAGUE_LIST[3] + "/teams";
        const rawResponse: any = await fetch(requestURL);
        const espnResponse: any = await rawResponse.json();
        const teamListAll: any[] = espnResponse.sports[0].leagues[0].teams;
        teamListAll.forEach( teamx => {
            console.log(teamx.team.slug + " " + teamx.team.id);
            teamIDMap.push([teamx.team.slug, teamx.team.id]);
        
    });

    console.log(teamIDMap);
}

teamIDConverter();