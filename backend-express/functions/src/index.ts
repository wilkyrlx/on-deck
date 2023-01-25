import * as functions from "firebase-functions";
import teamIDConverter from "./util/teamConverter";


export const sports = functions.https.onRequest(async (request, response) => {
    functions.logger.info("Sports endpoint running, v1.2", { structuredData: true });
    const API_URL_STUB_SCHED: string = "https://site.api.espn.com/apis/site/v2/sports/";
    const sportParam: string = request.query.sport as string
    const leagueParam: string = request.query.league as string
    // TODO: convert this teamParamRaw to correct code
    const teamParamRaw: string = request.query.team as string
    const teamConverter = await teamIDConverter(); 
    const teamParam: string = teamConverter.get(teamParamRaw) as string;
    console.log(teamParam + " this is the teamParam")
    // const requestURL: string = API_URL_STUB_SCHED + sportParam + "/" + leagueParam + "/scoreboard?lang=en&region=us&calendartype=blacklist&limit=100&dates=2020&teams=" + teamParamRaw
    const requestURL: string = API_URL_STUB_SCHED + sportParam + "/" + leagueParam + "/teams/" + teamParamRaw + "/schedule";
    const rawResponse: any = await fetch(requestURL);
    const espnResponse: any = await rawResponse.json();

    const eventList: any[] = [];
    espnResponse.events.forEach((event: any) => {
        const eventDate: Date = new Date(event.date);
        // TODO: do homeTeamName and awayTeamName the correct way
        const eventObj: any = { date: eventDate, name: event.name, id: event.id, link: event.links[0].href, homeTeamName: event.competitions[0].competitors[0].team.displayName, awayTeamName: event.competitions[0].competitors[1].team.displayName }
        eventList.push(eventObj);
    });

    const finalResponse = { result: "success", displayName: espnResponse.team.displayName, eventList: eventList };
    response.send(finalResponse);
});
