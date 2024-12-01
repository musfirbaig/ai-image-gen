import { NextResponse } from "next/server";
import {Storage} from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

export default async function POST(req: Request) {
    const {base64image, filename} = await req.json();
    // filename is same as prompt text, so we will add uuid to make it unique
    const uuid = uuidv4();
    const newFilename = `${filename}-${uuid}.png`;
    const storage = new Storage({
        keyFilename: './assignment-2-443412-8ac1634f9770.json'
    });

    const bucket = storage.bucket('ai-generated-images');
    const file = bucket.file(newFilename);

    // convert base64image to base64 buffer
    const base64Buffer = Buffer.from(base64image, 'base64');

    // store image in cloud storage as png
    await file.save(base64Buffer, {
        metadata: {
            contentType: 'image/png'
        }
    });

    return NextResponse.json({ message: 'Image saved to cloud storage successfully' });

}