import * as functions from "firebase-functions";
import { slugIDConversionsMap } from "./data/slugIDConversions";


export const sports = functions.https.onRequest(async (request, response) => {
    functions.logger.info("Sports endpoint running, v1.2", { structuredData: true });
    const API_URL_STUB_SCHED: string = "https://site.api.espn.com/apis/site/v2/sports/";
    const sportParam: string = request.query.sport as string
    const leagueParam: string = request.query.league as string
    const teamParamRaw: string = request.query.team as string

    const teamParamParsed: string = slugIDConversionsMap.find((team: any) => team.slug === teamParamRaw)?.id || "ID NOT FOUND FOR SLUG";

    // const requestURL: string = API_URL_STUB_SCHED + sportParam + "/" + leagueParam + "/scoreboard?lang=en&region=us&calendartype=blacklist&limit=100&dates=2020&teams=" + teamParamRaw
    const requestURL: string = API_URL_STUB_SCHED + sportParam + "/" + leagueParam + "/teams/" + teamParamParsed + "/schedule";
    let espnResponse: any;
    // FIXME: incurring some issues with CORS/ deployment. maybe handle promises better?

    const rawResponse: any = await fetch(requestURL);
    espnResponse = await rawResponse.json();

    const eventList: any[] = [];
    espnResponse.events.forEach((event: any) => {
        const eventDate: Date = new Date(event.date);
        // TODO: do homeTeamName and awayTeamName the correct way
        const eventObj: any = { date: eventDate, name: event.name, id: event.id, link: event.links[0].href, homeTeamName: event.competitions[0].competitors[0].team.displayName, awayTeamName: event.competitions[0].competitors[1].team.displayName }
        eventList.push(eventObj);
    });


    const finalResponse = { result: "success", displayName: espnResponse.team.displayName, eventList: eventList };

    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.send(finalResponse);
});
