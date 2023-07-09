//Types
import { EventData } from "../Types/events.types";

export const headers = {
    "Authorization": `Bearer 3E103B6C6941489F98CBEA25588739C1`
}

export const GET_EVENTS_LIST = async (): Promise<EventData[]> => await (await fetch("https://eu.teamdesk.net/secure/api/v2/90583/events/select.json", { headers }).then(res => res.json()));