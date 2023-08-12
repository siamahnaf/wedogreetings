import { SentEmailData, SentEmailResponse } from "@/Query/Types/Email/email.types";

const headers = {
    "Content-Type": "application/json"
}

export const SENT_EMAIL = async (data: SentEmailData): Promise<SentEmailResponse> => await (await fetch("/api/email", { method: "POST", headers, body: JSON.stringify(data) }).then(res => res.json()));