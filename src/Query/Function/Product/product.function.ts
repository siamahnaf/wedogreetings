import { headers } from "../../Client";

//Types
import { ProductData } from "@/Query/Types/Product/product.types";


//Get Web Gallery Sections
export const GET_SINGLE_PRODUCT = async (id: number): Promise<ProductData[]> => await (await fetch(`https://wdg.teamdesk.net/secure/api/v2/90582/Web%20Product%20Listing/retrieve.json?column=Product%20Name&column=Product%20Description%20Large&column=Prod%20Img%20Large%201&column=Price%20From&column=Rental%20Duration&column=Set-up&column=Additions&column=Prod%20Img%20Large%202&column=Prod%20Img%20Large%203&column=Prod%20Img%20Large%204&column=Expire%20Product%20Date&id=${id}`, { headers }).then(res => res.json()));