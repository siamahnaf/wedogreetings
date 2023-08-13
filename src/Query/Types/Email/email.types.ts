export interface SentEmailResponse {
    MessageID: string;
}

export interface SentEmailData {
    to: {
        name: string;
        email: string;
    }[];
    cc?: {
        name: string;
        email: string;
    }[];
    subject: string;
    templateName: string;
    value: any
}