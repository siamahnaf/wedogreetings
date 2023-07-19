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
    Id: string;
    "Record Owner": string;
    Franchisee: string;
    "Area Code": string;
}


export interface UnavailabilityData {
    "@row.id": number;
    Event: string;
    "Franchisee Details First Name": string;
    From: string;
    To: string;
}

export interface FranchiseeDetailsData {
    "@row.id": number;
    "First Name": string;
    "Billing Address": string;
    Phone: string;
    Email: string;
    "Comany Name": string;
    "Sort Code": string;
    "Account Number": string;
    "Invoice Date": string;
    "Francise Area Name": string;
    Title: string;
    "Public Name": string;
    "Last Name": string;
    Status: string;
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
    Status: string;
    "Rental Days": number;
    Id: string;
    "Record Owner": string;
    "Franchisee Name": string;
    "Customer Name": string;
    "Inventory Name": string;
    "Rent Date": string;
    "Return Date": string;
    "Signage Message": string;
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
