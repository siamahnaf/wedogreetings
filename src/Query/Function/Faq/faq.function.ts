import { headers } from "../../Client";

//Types
import { FaqData } from "@/Query/Types/Faq/faq.types";

//Get Web Gallery Sections
export const GET_WEB_FAQ = async (): Promise<FaqData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Terms%20%26%20FAQs/Default%20View/select.json?filter=%5BType%5D%3D%22FAQ%22%20and%20%5BStatus%5D%3D%22Active%22", { headers }).then(res => res.json()));