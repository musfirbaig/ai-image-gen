// ts-ignore
/* eslint-disable */
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { JWT } from "google-auth-library";
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import path from "path";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // AI Platform Configuration
        const PROJECT_ID = process.env.PROJECT_ID || '742188722628';
        const ENDPOINT_ID = process.env.ENDPOINT_ID || '732900366215020544';
        // const keyFilePath = process.env.GOOGLE_CLOUD_KEY_PATH || './assignment-2-444603-28e9e1a47d7f.json';

        const keyFilePath = path.join(process.cwd(), 'public/assignment-2-444603-28e9e1a47d7f.json');

        // Auth setup
        const auth = new JWT({
            keyFile: keyFilePath,
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

        const storage = new Storage({ keyFilename: keyFilePath });
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