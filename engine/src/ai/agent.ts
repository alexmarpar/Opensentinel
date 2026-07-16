import { generateText } from "ai";
import getModel from "./model";

export async function chat(body: { provider: string; message: string }) {
    const model = await getModel(body.provider)

    const response = await generateText({
        model,
        messages: [
            {
                role: "user",
                content: body.message
            }
        ]
    });

    return response;
}