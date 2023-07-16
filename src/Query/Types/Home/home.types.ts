export interface WebHeroData {
    "@row.id": number;
    Header: string;
    Copy: string;
    Image: string;
    Status: string;
    "Display Until": Date;
}

export interface WebProductData {
    "@row.id": number;
    "Product Name": string;
    "Poduct Description Small": string;
    "Product Description Large": string;
    "Prod Img Small": string;
    "Price From": number;
    "Rental Duration": string;
    "Set-up": string;
    Additions: string;
    Status: string;
}


export interface WebCustomReviewData {
    "@row.id": number;
    "Review Heading": string;
    "Review Content": string;
    "Star Rating": number;
    Show: string;
    "Reviewee Image": string;
    "Rentees (customers) Contact Person": string;
}


export interface WebGalleryData {
    "@row.id": number;
    image: string;
    "Alternative Text": string;
}
