import { NextResponse } from "next/server";
import { Storage } from '@google-cloud/storage';
import path from "path";

export async function GET() {
    try {
        // Initialize Storage client
        // const keyFilePath = process.env.GOOGLE_CLOUD_KEY_PATH || './assignment-2-444603-28e9e1a47d7f.json';
        const keyFilePath = path.join(process.cwd(), 'public/assignment-2-444603-28e9e1a47d7f.json');
        const storage = new Storage({ keyFilename: keyFilePath });
        const bucketName = 'ai-image-gen-bucket';

        // Get bucket reference
        const bucket = storage.bucket(bucketName);

        // List all files in bucket
        const [files] = await bucket.getFiles();

        // Format response data
        const images = files.map(file => ({
            imageUrl: `https://storage.googleapis.com/${bucketName}/${file.name}`,
            name: file.name
        }));

        return NextResponse.json({
            success: true,
            images
        });

    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({
            error: 'Failed to fetch images',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

