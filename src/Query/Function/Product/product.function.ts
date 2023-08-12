import { headers } from "../../Client";

//Helpers
import { getOwner } from "@/Helper/record-owner";

//Types
import { ProductData, FranchiseeAreaCodeData, UnavailabilityData, FranchiseeDetailsData, OrderDetailsForTiming, AddCustomRequestData, AddCustomRequestResponse, GetProductData, GetResponseData, AddOrderPlaceData, GetExamLettersData } from "@/Query/Types/Product/product.types";



//Get Web Gallery Sections
export const GET_SINGLE_PRODUCT = async (id: number): Promise<ProductData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Product%20Listing/retrieve.json?column=Product%20Name&column=Product%20Description%20Large&column=Prod%20Img%20Large%201&column=Price%20From&column=Rental%20Duration&column=Set-up&column=Additions&column=Prod%20Img%20Large%202&column=Prod%20Img%20Large%203&column=Prod%20Img%20Large%204&column=Expire%20Product%20Date&id=${id}`, { headers }).then(res => res.json()));

//Get All Product List
export const GET_ALL_PRODUCT = async (): Promise<ProductData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Product%20Listing/Default%20View/select.json?filter=%5BStatus%5D%3D%22Active%22", { headers }).then(res => res.json()));

//GET Postal Codes
export const GET_POSTAL_CODE = async (code: string): Promise<FranchiseeAreaCodeData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Franchisee%20Area%20Code/select.json?filter=%5BArea%20Code%20w%2Fo%20Spaces%5D%3D%22${code.replace(/\s/g, '')}%22`, { headers }).then(res => res.json()));

//GET Unavailability Date
export const GET_UNAVAILABLE_DATE = async (id: string): Promise<UnavailabilityData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Unavailable%20Date/select.json?filter=%5BReference%20to%20Admin%20-%20User%20Property%5D%3DToUser(%22${getOwner(id)}%22)`, { headers }).then(res => res.json()));

//Get Franchisee Details
export const GET_FRANCHISEE_DETAILS = async (id: string): Promise<FranchiseeDetailsData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/My%20Profile/select.json?filter=%5BRecord%20Owner%5D%3DToUser(%22${getOwner(id)}%22)`, { headers }).then(res => res.json()));

//Get Setup times
export const GET_SET_UP_TIMES = async (date: string, id: string): Promise<OrderDetailsForTiming[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Order/select.json?filter=ToDate(%5BRental%20Date%5D)%3D%20ToDate(%22${date}%22)%20or%20ToDate(%5BReturn%20Date%5D)%3D%20ToDate(%22${date}%22)%20and%20%5BReference%20to%20Admin%20-%20User%20Property%5D%3D%20ToUser(%22${getOwner(id)}%22)`, { headers }).then(res => res.json()));


//Get Removal times
export const GET_REMOVAL_TIMES = async (date: string, id: string): Promise<OrderDetailsForTiming[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Order/select.json?filter=ToDate(%5BRental%20Date%5D)%3D%20ToDate(%22${date}%22)%20or%20ToDate(%5BReturn%20Date%5D)%3D%20ToDate(%22${date}%22)%20and%20%5BReference%20to%20Admin%20-%20User%20Property%5D%3D%20ToUser(%22${getOwner(id)}%22)`, { headers }).then(res => res.json()));


//Add Custom Request
export const ADD_CUSTOM_REQUEST = async (data: AddCustomRequestData): Promise<AddCustomRequestResponse[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Customer/create.json", { method: "POST", headers, body: JSON.stringify(data) }).then(res => res.json()));



//Get Example Letters
export const GET_EXAMPLE_LETTERS = async (): Promise<GetExamLettersData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Inspire%20%252F%20Show%20Me/Default%20View/select.json?filter=%5BType%5D%3D%22Inspire-Me%22", { headers }).then(res => res.json()));

//GET Backdrop
export const GET_BACKDROP = async (id: string, sub: string): Promise<GetProductData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Item%20in%20Stock/Default%20View/select.json?filter=%5BStatus%5D%3D%22Active%22%20and%20%5BCategory%5D%3D%22Foldable%20Background%22%20and%20%5BSub-Category%5D%3D%22${sub}%22%20and%20%5BEmail%5D%3D%22${getOwner(id)}%22`, { headers }).then(res => res.json()));


//Get Letters
export const GET_LETTERS = async (letter: string, id: string): Promise<GetProductData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Item%20in%20Stock/Default%20View/select.json?filter=%5BCategory%5D%3D%22Characters%22%20and%20%5BStatus%5D%3D%22Active%22%20and%20%5BEmail%5D%3D%22${getOwner(id)}%22%20and%20%5BItem%5D%3D%22${letter}%22`, { headers }).then(res => res.json()));

//GET Emoji
export const GET_EMOJIS = async (id: string): Promise<GetProductData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Item%20in%20Stock/Default%20View/select.json?filter=(%5BCategory%5D%3D%22Accessories%22%20or%20%5BCategory%5D%3D%22Emojis%22)%20and%20%5BStatus%5D%3D%22Active%22%20and%20%5BEmail%5D%3D%22${getOwner(id)}%22`, { headers }).then(res => res.json()));



//Get The Response
export const GET_PAYMENT_RESPONSE = async (id: string): Promise<GetResponseData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/WorldPay%20Webhook/select.json?filter=%5BcartId%5D%3D%22${id}%22`, { headers }).then(res => res.json()));


//Place the order
export const PLACE_ORDER = async (data: AddOrderPlaceData): Promise<AddCustomRequestResponse[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Order/create.json", { method: "POST", headers, body: JSON.stringify(data) }).then(res => res.json()));