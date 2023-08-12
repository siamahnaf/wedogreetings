export interface WebHeroData {
    "@row.id": number;
    Header: string;
    Copy: string;
    Image: string;
    Status: string;
    "Display Until": string;
    BlurHash: string;
    "Alt tag": string;
}

export interface WebProductData {
    "@row.id": number;
    "Product Name": string;
    "Poduct Description Small": string;
    "Product Description Large": string;
    "Prod Img Small": string;
    "Prod Img Large 1": string;
    "Price From": number;
    "Rental Duration": string;
    "Set-up": string;
    Additions: string;
    Status: string;
    "Alt tag": string;
}


export interface WebCustomReviewData {
    "@row.id": number;
    "Review Heading": string;
    "Review Content": string;
    "Star Rating": number;
    Show: string;
    "Reviewee Image": string;
    "Rentees (customers) Contact Person": string;
    "Alt tag": string;
}


export interface WebGalleryData {
    "@row.id": number;
    image: string;
    "Alternative Text": string;
    "Alt tag": string;
}
