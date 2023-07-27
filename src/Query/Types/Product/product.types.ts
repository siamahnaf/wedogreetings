export interface ProductData {
    "@row.id": number;
    "Product Name": string;
    "Product Description Large": string;
    "Prod Img Large 1": string;
    "Price From": number;
    "Rental Duration": string;
    "Set-up": string;
    Additions: string;
    "Prod Img Large 2": string;
    "Prod Img Large 3": string;
    "Prod Img Large 4": string;
    "Expire Product Date": Date;
}
export interface FranchiseeAreaCodeData {
    "@row.id": number;
    "Area Code": string;
    Surcharge: number;
    Id: string;
    "Record Owner": string;
    "Franchisee (old)": string;
    "Reference to Admin - User Property": string;
}

export interface UnavailabilityData {
    "@row.id": number;
    Event: string;
    From: string;
    To: string;
    "Franchisee Name (old)": string;
    Id: string;
    "Record Owner": string;
    "Reference to Admin - User Property": string;
}

export interface FranchiseeDetailsData {
    "@row.id": number;
    User: string;
    "Public Name": string;
    Phone: string;
    "Email for Orders": string;
    Franchisee: boolean;
    Status: string;
    "Franchise Area Name": string;
    "Company Name": string;
    "Delivery Address": string;
    "MidWk Price": number;
    "Wknd Price": number;
    WID: string;
    "Record Owner": string;
    Title: string;
}

export interface AddCustomRequestData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface AddCustomRequestResponse {
    status: number;
    id: number;
    key: string;
}

export interface GetBackdropData {
    "@row.id": number;
    Id: string;
    Category: string;
    "Sub-Category": string;
    Item: string;
    Colour: string;
    Qty: number;
    Image: string;
    Status: string;
    Item_selector: string;
}


export interface GetBackdropStock {
    "@row.id": number;
    Position: string;
    "Index Number": number;
    Id: string;
    "Record Owner": string;
    "Reference to Inventory Name": string;
    "Reference to Customer Transaction": string;
    "Position Abbreviation": string;
}


export interface GetLettersData {
    "@row.id": number;
    Category: string;
    "Sub-Category": string;
    Item: string;
    Colour: string;
    Qty: number;
    Image: string;
    Status: string;
    Item_selector: string;
}

export interface GetResponseData {
    "@row.id": number
    transId: string
    cartId: string
    name: string
    Id: string
    "Record Owner": string
}

export interface AddOrderPlaceData {
    "Transaction Amount": number;
    "Signage Message": string;
    "Rental Date": string;
    "id": string;
    "Rental Days": number;
    "WP Authcode": string;
    "Reference to Admin - User Property": string;
    "Reference to Web Product Listing": string;
    "Rentals String": string;
    "Customer String": string;
}