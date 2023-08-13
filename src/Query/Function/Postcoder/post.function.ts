import { CoderResponse } from "@/Query/Types/Postcoder/post.types";

export const GET_POSTCODER_DETAILS = async (code: string): Promise<CoderResponse[]> => await (await fetch(`https://ws.postcoder.com/pcw/${process.env.NEXT_PUBLIC_POSTCODER_API}/street/uk/${code.replace(/ /g, '')}?format=json`).then(res => res.json()));