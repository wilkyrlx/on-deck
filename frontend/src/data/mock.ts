import { Event } from '../model/Event'
import { Sport } from '../model/Sport'

export const mockEvents: Event[] = [
    new Event(
        "test1",
        { name: "Pittsburgh Steelers", iconUrl: "icon.url", sport: Sport.NFL },
        { name: "Pittsburgh Steelers", iconUrl: "icon.url", sport: Sport.NFL },
        addHours(new Date(), 1),
        addHours(new Date(), 3),
        Sport.NFL
    ),
    new Event(
            "test2",
            { name: "Pittsburgh Steelers", iconUrl: "icon.url", sport: Sport.NFL },
            { name: "Pittsburgh Steelers", iconUrl: "icon.url", sport: Sport.NFL },
            addHours(new Date(), 5),
            addHours(new Date(), 7),
            Sport.NFL
    )
]

function addHours(date: Date, hours: number){
    var copiedDate = new Date(date.getTime());
    copiedDate.setHours(copiedDate.getHours() + hours);
    return copiedDate;
}