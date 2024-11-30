import { NextResponse } from "next/server"
import fetch from "node-fetch"
import {JWT} from "google-auth-library"



export async function POST(req: Request){
  const {prompt} = await req.json();

  const PROJECT_ID = '733218543558';
  const ENDPOINT_ID = '8590203972348805120';
  const keyFilePath = './assignment-2-443206-f445dbbbe562.json';

  const auth = new JWT({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  })

  const tokens = await auth.authorize();
  const token = tokens.access_token;

  const endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`;
  
  const reqBody = {
    "instances": [
    {"prompt": prompt}
    ]
    }

    try{
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqBody)
      });
    
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
    
      const data:any = await response.json();
      console.log(data);

      const imageBase64 = data.predictions[0].predicted_image;
      
      console.log("base64 image : ", imageBase64);
    
    
      return NextResponse.json({ image: imageBase64 });
    }
    catch (error) {
      console.error('Error generating image:', error);
      return NextResponse.json({ error: 'Internal server error' }, {
        status: 500,
      });
    }
  

}