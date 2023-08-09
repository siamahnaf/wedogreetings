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
    "Available for Installations From": string;
    "Available Till": string;
    "Allow Hours Between Installations": number;
    "Email Opt-Out": boolean;
}

export interface OrderDetailsForTiming {
    "@row.id": number;
    Number: string;
    "Transaction Amount": number;
    "Transaction Date": string;
    "Signage Message": string;
    "Rental Date": string;
    "Rental Days": number;
    "Return Date": string;
    "WP Authcode": string;
    "Transaction Comment": string;
    Id: string;
    "Record Owner": string;
    "Reference to Customer Details": string;
    "Reference to Web Product Listing": string;
    "# of Stands": number;
    "Reference to Admin - User Property": string;
    "Rentals String": string;
}

export interface AddCustomRequestData {
    "Title": string;
    "First Name": string;
    "Last Name": string;
    "Phone": string;
    "Email": string;
    "Address line": string;
    "Post Code": string;
    "County": string;
    "Opt-in Marketing": string;
    "Opt-in Terms": string;
    "Opt-in Seek Installer": string;
    "Opt-in Franchise Op": string;
}

export interface GetExamLettersData {
    "@row.id": number;
    Image: string;
    Type: string;
    "Web Product Listing Product Name": string;
}


export interface AddCustomRequestResponse {
    status: number;
    id: number;
    key: string;
}

export interface GetProductData {
    "@row.id": number;
    Category: string;
    "Sub-Category": string;
    Item: string;
    Image: string;
    "Quantity in Stock": number;
    Franchisee: string;
    Email: string;
    Status: string;
    "Dates Rented Out": string;
    "Image Address": string;
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