import { headers } from "../../Client";

//Helpers
import { getOwner } from "@/Helper/record-owner";

//Types
import { ProductData, FranchiseeAreaCodeData, UnavailabilityData, FranchiseeDetailsData, AddCustomRequestData, AddCustomRequestResponse, GetBackdropData, GetBackdropStock, GetLettersData } from "@/Query/Types/Product/product.types";


//Get Web Gallery Sections
export const GET_SINGLE_PRODUCT = async (id: number): Promise<ProductData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Product%20Listing/retrieve.json?column=Product%20Name&column=Product%20Description%20Large&column=Prod%20Img%20Large%201&column=Price%20From&column=Rental%20Duration&column=Set-up&column=Additions&column=Prod%20Img%20Large%202&column=Prod%20Img%20Large%203&column=Prod%20Img%20Large%204&column=Expire%20Product%20Date&id=${id}`, { headers }).then(res => res.json()));

//Get All Product List
export const GET_ALL_PRODUCT = async (): Promise<ProductData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Product%20Listing/Default%20View/select.json", { headers }).then(res => res.json()));

//GET Postal Codes
export const GET_POSTAL_CODE = async (code: string): Promise<FranchiseeAreaCodeData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Franchisee%20Area%20Code/select.json?filter=%5BArea%20Code%5D%3D%22${code.replace(/ /g, "%20")}%22`, { headers }).then(res => res.json()));

//GET Unavailability Date
export const GET_UNAVAILABLE_DATE = async (id: string): Promise<UnavailabilityData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Franchisee%20Unavailability/select.json?filter=%5BReference%20to%20Admin%20-%20User%20Property%5D%3DToUser(%22${getOwner(id)}%22)`, { headers }).then(res => res.json()));

//Get Franchisee Details
export const GET_FRANCHISEE_DETAILS = async (id: string): Promise<FranchiseeDetailsData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Admin%20-%20User%20Property/select.json?filter=%5BRecord%20Owner%5D%3DToUser(%22${getOwner(id)}%22)`, { headers }).then(res => res.json()));


//Add Custom Request
export const ADD_CUSTOM_REQUEST = async (data: AddCustomRequestData): Promise<AddCustomRequestResponse[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Admin%20-%20Custom%20Request/create.json", { method: "POST", headers, body: JSON.stringify(data) }).then(res => res.json()));

//Get Example Letters
export const GET_EXAMPLE_LETTERS = async (): Promise<GetLettersData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Inventory%20Master%20Vertical/List%20All/select.json?filter=%5BCategory%5D%3D%22Letters%22%20and%20%5BStatus%5D%3D%22Active%22&top=30", { headers }).then(res => res.json()));

//GET Backdrop
export const GET_BACKDROP = async (): Promise<GetBackdropData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Inventory%20Master%20Vertical/List%20All/select.json?filter=%5BCategory%5D%3D%22Foldable%20Background%22%20and%20%5BStatus%5D%3D%22Active%22", { headers }).then(res => res.json()));

//Get Backdrop Stock
export const GET_INVENTORY_STOCK = async (franchise: string): Promise<GetBackdropStock[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Customer%20Rental/select.json?filter=%5BRecord%20Owner%5D%3DToUser(%22${getOwner(franchise)}%22)`, { headers }).then(res => res.json()));


//Get Letters
export const GET_LETTERS = async (letter: string): Promise<GetLettersData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Inventory%20Master%20Vertical/List%20All/select.json?filter=%5BCategory%5D%3D%22Letters%22%20and%20%5BStatus%5D%3D%22Active%22%20and%20%5BItem%5D%3D%22${letter}%22`, { headers }).then(res => res.json()));

//GET Emoji
export const GET_EMOJIS = async (): Promise<GetBackdropData[]> => await (await fetch("https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Inventory%20Master%20Vertical/List%20All/select.json?filter=(%5BCategory%5D%3D%22Accessories%22%20or%20%5BCategory%5D%3D%22Emojis%22)%20and%20%5BStatus%5D%3D%22Active%22&top=20", { headers }).then(res => res.json()));