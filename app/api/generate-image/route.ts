
/* eslint-disable */
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { JWT } from "google-auth-library";
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
// import path from "path";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // AI Platform Configuration
        const PROJECT_ID = process.env.PROJECT_ID || '742188722628';
        const ENDPOINT_ID = process.env.ENDPOINT_ID || '732900366215020544';
        // const keyFilePath = process.env.GOOGLE_CLOUD_KEY_PATH || './assignment-2-444603-a1bec72db44e.json';

        // const keyFilePath = path.join(process.cwd(), 'public/assignment-2-444603-28e9e1a47d7f.json');


        const credential = JSON.parse(
            Buffer.from(`ew0KICAidHlwZSI6ICJzZXJ2aWNlX2FjY291bnQiLA0KICAicHJvamVjdF9pZCI6ICJhc3NpZ25tZW50LTItNDQ0NjAzIiwNCiAgInByaXZhdGVfa2V5X2lkIjogImExYmVjNzJkYjQ0ZWFlOTFjNDk0YzBiNTllZmU3MWRiMThkOWQ2NDYiLA0KICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdlFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUNOdGVIL1pWeHNzUDVWXG5PS1Q5YTVXemhrMXhpSW9wcGFMTjBTRDZFNDJmTFJidWhmcDN0N0hlb0lRYWg5RXJ1Z25KSHZVWmU2TDZzb2V6XG5RdHpGWkc3dit3S295eldwTHB0RUovZThncjNUTjF0cWN3dW9UTzUwS0hlZE41a3JHRXhnd3VXSndzYldEVGVUXG5kbG9uLzlScEVWTFRIWkluUE9PODV2STVzNm5LR2pyQVhMTFkvOVkrN0IwN200dEUrcFJzYldkOHBaU1NGekpEXG5pUGdtbEdqTUFmN0V6QmIyZmVhaFR0aUx5UUxVSjJZc01MQ2dsOHlVRDFXbzEwb0lyOG8wbVFCOUFsdzJUTjZ3XG5wby9sejQrOHVaRUJLb2ZVem55b1B2blY1U2hRQmtxOWQyZGhJL2xuKy9HSm9TSzBmeXZlOHZid3lQQlFLMUdtXG56Vk9rZVFNbkFnTUJBQUVDZ2dFQUxiZXE5SEVuOHl6YXNIVzR6TVVqbzZwRlc4WllCSDJhVzFvSGtJWTBYMUQxXG5uL2Y3U1Jvck9RNkI3K2szTXlzdXN3TFl3ZUxnUG83UU5xWHdnWUlZUkRXdnN2TDBHZU9lVmN1cklkYndGSzg4XG5QOGhqejJVYVhNRWRiY3dkRHdra3d1YTlsTWNRek1ldzBWTVNYT3N0Qk1TQSt2a0VTTUpkR25sTFZoQS9TNkxWXG53ZzJEanFqNzl5bDNUeUQ5akM2S3YxYTVhZU1oQzVaVzE1SXFQL2xmYjJHekh3UzlpdFI4cFJZUXFoaGwrNFBUXG5hY2l4a3gyTEpRaDIvU2pBWTdZTHdhaTZoR1MrTFhYRUZreVptZmxJeUgzbys2eDN5QnNrcGgvTFFGTHZndEREXG5GRTBRcHU5REtNRnJuckxTUmdxQkh1eFhvZnRDbGE5VUhSbGtXT1c1T1FLQmdRQytwY3huY2xZY2t2dGtUWFpyXG5IdGh3WTVlelYvandtdmFUdzg1MGdDK2tPTE5ETHRrTnZuNVA4T2dhTVQwTXlqTWZIdWhibCsvQzhPNU4zYWhjXG5GUURKNjl1N05hN0duS0t0Yllmdk90WjlLa05ubmtjZ3Faa1hXSjEvQ3lwRUhVZE5FYWppajQydjkxdlo0dDhXXG5EaGF3cXA0RUErSk9uU3BJSDNPeTR6SGROUUtCZ1FDK1NaL1BSSGFmTUlyTnJSdnpuUkhGaFV5eE44TWRJa0JsXG53d1pmaXNxNWYrSjRBNlpXUkc3WDhjT1VMZk84OEVCT0FiR2hucEIvR2pFbFhiU244QXZCU2ladE84OEJ0ZHBkXG5GNnJ2eGxhbGRSRW1tQ2g4WXgvVmxlYUF3bjZNQjlUMzN1QnFRUElUb2JSTHo3TzJ2c2pHUWNRaFZOK3k4UlU4XG5ZSkwzVmdNV2F3S0JnUUNQWHRZUjhXMEt2Z29weXd0RDBZV0pONHhNeGRxaTdwYUNWeDA2aFcvT2V3bHNlNTJsXG5kVjArTnZnRlFvUWJ5eStZdHNDY3FPMFkxK0VPVTZRWjQzMmRYQzc1WVl5WE5oSXNoQk5XK0JOM08wSkhlVU1hXG5NQkM5K3RrdVFqSTkyUnJXdlhJWk4wV2hVRThWMDBSYkxLc3BucFdJaFhjNkVYMUxrY09MZ3Nuc0JRS0JnRzJiXG5qeGdld1kxVXNyOWlkWFZRQmtxV1MrVFF6K3phSytueCtwdlNJSS9WWUNmdFFrVHl5ajVOSG5FZVB3V1lCaEpvXG4yMTdUTFR4cFkrRzRKaldPQ2RkZTFOK2EwZFNVWWFHNTNsYWJFcEhmNnU4bU9qdmNCUnhNYWlmRTRJdmNmd29BXG5NWmhDcks0dU9PSnFVNFJ5Uk1nZVhkRXRTR1dVaEx6d2kvYzRiakxkQW9HQU8zaHp0WEJOc0sxNlF1QmlyeFNrXG5VNElqZUZwTUJ2bXNJcWRpVnd4RFFkUzJPRkUrWkJNMEpuTlVhVHk3aXJZWC9BN2oxOHdxQms1UkhyazN5eWxBXG54bDUzWC9qbXZ3U2x6djlTMXF3RXRzM1NaVUtqYm1MbTYxdGFWVzN2KzVpTGRSa0pvYTdZQlVVRU9PVUo0T09QXG5sRnBqQ1NZeDVNUy9SMmJySkU5N0RXVT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsDQogICJjbGllbnRfZW1haWwiOiAiYXNzaWduLTItYWlAYXNzaWdubWVudC0yLTQ0NDYwMy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsDQogICJjbGllbnRfaWQiOiAiMTA2Njg2NjEwOTAyMTAwMTY5MDE5IiwNCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwNCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsDQogICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwNCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvYXNzaWduLTItYWklNDBhc3NpZ25tZW50LTItNDQ0NjAzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwNCiAgInVuaXZlcnNlX2RvbWFpbiI6ICJnb29nbGVhcGlzLmNvbSINCn0=`, "base64").toString("utf-8"));

            

        // Auth setup

        // const auth = new JWT({
        //     keyFile: keyFilePath,
        //     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        // });

        const auth = new JWT({
            email: credential.client_email,
            key: credential.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });

        const tokens = await auth.authorize();
        const token = tokens.access_token;

        // Generate image
        const endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`;
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                instances: [{ prompt }]
            })
        });


        if (!response.ok) {
            throw new Error('Failed to generate image');
        }
        // tslint:disable-next-line: no-any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await response.json();
        const imageBase64 = data.predictions[0].predicted_image;

        const imageBase64Data = imageBase64[0];

        console.log("data: ", data);

        // Save to Cloud Storage

        const storage = new Storage({ credentials: {
            client_email: credential.client_email,
            private_key: credential.private_key,
          } });


        const bucket = storage.bucket('ai-image-gen-bucket');
        const uuid = uuidv4();
        const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '-');
        const filename = `${sanitizedPrompt}-${uuid}.png`;
        const file = bucket.file(filename);

        const base64Buffer = Buffer.from(imageBase64Data, 'base64');
        await file.save(base64Buffer, {
            metadata: {
                contentType: 'image/png',
                metadata: {
                    prompt: prompt,
                    generatedAt: new Date().toISOString()
                }
            }
        });

        // Get public URL

        const publicUrl = `https://storage.googleapis.com/ai-image-gen-bucket/${filename}`;

        return NextResponse.json({
            success: true,
            image: imageBase64,
            url: publicUrl,
            // filename
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}