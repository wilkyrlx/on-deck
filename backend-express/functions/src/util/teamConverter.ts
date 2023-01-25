
async function teamIDConverter(): Promise<Map<String, String>> {
    const LEAGUE_LIST = ["football/nfl", "baseball/mlb", "basketball/nba", "hockey/nhl"];
    const teamIDMap = new Map<String, String>();


    const API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
    const requestURL: string = API_URL_STUB + LEAGUE_LIST[0] + "/teams";
    const rawResponse: any = await fetch(requestURL);
    const espnResponse: any = await rawResponse.json();
    const teamList: any[] = espnResponse.sports[0].leagues[0].teams;

    teamList.forEach(teamObj => {
        const teamSlug: string = teamObj.team.slug;
        const teamID: string = teamObj.team.id;
        teamIDMap.set(teamSlug, teamID);
    });

    return teamIDMap;
}



export default teamIDConverter;