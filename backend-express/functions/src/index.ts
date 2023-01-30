import * as functions from "firebase-functions";
import { slugIDConversionsMap } from "./data/slugIDConversions";

/**
 * sports endpoint for the backend. This endpoint returns a list of events for a given team.
 */
export const sports = functions.https.onRequest(async (request, response) => {
    functions.logger.info("Sports endpoint running, v1.2", { structuredData: true });
    const API_URL_STUB_SCHED: string = "https://site.api.espn.com/apis/site/v2/sports/";
    const sportParam: string = request.query.sport as string
    const leagueParam: string = request.query.league as string
    const teamParamRaw: string = request.query.team as string
    // teamParamRaw is the slug, but we need the ID, so we have to do a lookup
    const teamParamParsed: string = slugIDConversionsMap.find((team: any) => team.slug === teamParamRaw)?.id || "ID NOT FOUND FOR SLUG";

    // fetch from the ESPN API
    const requestURL: string = API_URL_STUB_SCHED + sportParam + "/" + leagueParam + "/teams/" + teamParamParsed + "/schedule";
    const rawResponse: any = await fetch(requestURL);
    const espnResponse: any = await rawResponse.json();

    const eventList: any[] = [];
    espnResponse.events.forEach((event: any) => {
        const eventDate: Date = new Date(event.date);
        // TODO: do homeTeamName and awayTeamName the correct way
        const eventObj: any = { date: eventDate, name: event.name, id: event.id, link: event.links[0].href, homeTeamName: event.competitions[0].competitors[0].team.displayName, awayTeamName: event.competitions[0].competitors[1].team.displayName }
        eventList.push(eventObj);
    });


    // TODO: add better error handling
    const finalResponse = { result: "success", displayName: espnResponse.team.displayName, eventList: eventList };

    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.send(finalResponse);
});

/**
 * Placeholder for the important endpoint. In future iterations, this endpoint will
 * return a list of the three most important upcoming events for the user.
 */
export const important = functions.https.onRequest(async (request, response) => {
    const finalResponse = { result: "error_not_implemented", eventList: [] };
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.send(finalResponse);
});
