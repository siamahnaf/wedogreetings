import { headers } from "../../Client";

//Types
import { WebHeroData, WebProductData, WebCustomReviewData, WebGalleryData } from "@/Query/Types/Home/home.types";

//Get Web Hero Section
export const GET_WEB_HERO = async (): Promise<WebHeroData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Hero%20Section/Default%20View/select.json", { headers }).then(res => res.json()));

//Get Web Products Section
export const GET_WEB_PRODUCTS = async (): Promise<WebProductData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Product%20Listing/Default%20View/select.json?filter=%5BStatus%5D%3D%22Active%22", { headers }).then(res => res.json()));

//Get Web Customer Reviews Section
export const GET_CUSTOMER_REVIEWS = async (): Promise<WebCustomReviewData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Customer%20Reviews/Default%20View/select.json?top=9", { headers }).then(res => res.json()));

//Get Web Gallery Sections
export const GET_WEB_GALLERY = async (): Promise<WebGalleryData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Gallery%20Section/Default%20View/select.json", { headers }).then(res => res.json()));