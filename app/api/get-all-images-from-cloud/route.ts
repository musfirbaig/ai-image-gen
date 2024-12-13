
import { NextResponse } from "next/server";
import { Storage } from '@google-cloud/storage';
// import path from "path";

export async function GET() {
    try {
        // Initialize Storage client
        // const keyFilePath = process.env.GOOGLE_CLOUD_KEY_PATH || './assignment-2-444603-a1bec72db44e.json';

        // console.log('GOOGLE_CLOUD_KEY:', process.env.GOOGLE_CLOUD_KEY);

        // const credentials = new Buffer(process.env.GOOGLE_CLOUD_KEY, 'base64').toString('ascii');


//         const stringToEncode = `{
//   "type": "service_account",
//   "project_id": "assignment-2-444603",
//   "private_key_id": "a1bec72db44eae91c494c0b59efe71db18d9d646",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNteH/ZVxssP5V\nOKT9a5Wzhk1xiIoppaLN0SD6E42fLRbuhfp3t7HeoIQah9ErugnJHvUZe6L6soez\nQtzFZG7v+wKoyzWpLptEJ/e8gr3TN1tqcwuoTO50KHedN5krGExgwuWJwsbWDTeT\ndlon/9RpEVLTHZInPOO85vI5s6nKGjrAXLLY/9Y+7B07m4tE+pRsbWd8pZSSFzJD\niPgmlGjMAf7EzBb2feahTtiLyQLUJ2YsMLCgl8yUD1Wo10oIr8o0mQB9Alw2TN6w\npo/lz4+8uZEBKofUznyoPvnV5ShQBkq9d2dhI/ln+/GJoSK0fyve8vbwyPBQK1Gm\nzVOkeQMnAgMBAAECggEALbeq9HEn8yzasHW4zMUjo6pFW8ZYBH2aW1oHkIY0X1D1\nn/f7SRorOQ6B7+k3MysuswLYweLgPo7QNqXwgYIYRDWvsvL0GeOeVcurIdbwFK88\nP8hjz2UaXMEdbcwdDwkkwua9lMcQzMew0VMSXOstBMSA+vkESMJdGnlLVhA/S6LV\nwg2Djqj79yl3TyD9jC6Kv1a5aeMhC5ZW15IqP/lfb2GzHwS9itR8pRYQqhhl+4PT\nacixkx2LJQh2/SjAY7YLwai6hGS+LXXEFkyZmflIyH3o+6x3yBskph/LQFLvgtDD\nFE0Qpu9DKMFrnrLSRgqBHuxXoftCla9UHRlkWOW5OQKBgQC+pcxnclYckvtkTXZr\nHthwY5ezV/jwmvaTw850gC+kOLNDLtkNvn5P8OgaMT0MyjMfHuhbl+/C8O5N3ahc\nFQDJ69u7Na7GnKKtbYfvOtZ9KkNnnkcgqZkXWJ1/CypEHUdNEajij42v91vZ4t8W\nDhawqp4EA+JOnSpIH3Oy4zHdNQKBgQC+SZ/PRHafMIrNrRvznRHFhUyxN8MdIkBl\nwwZfisq5f+J4A6ZWRG7X8cOULfO88EBOAbGhnpB/GjElXbSn8AvBSiZtO88Btdpd\nF6rvxlaldREmmCh8Yx/VleaAwn6MB9T33uBqQPITobRLz7O2vsjGQcQhVN+y8RU8\nYJL3VgMWawKBgQCPXtYR8W0KvgopywtD0YWJN4xMxdqi7paCVx06hW/Oewlse52l\ndV0+NvgFQoQbyy+YtsCcqO0Y1+EOU6QZ432dXC75YYyXNhIshBNW+BN3O0JHeUMa\nMBC9+tkuQjI92RrWvXIZN0WhUE8V00RbLKspnpWIhXc6EX1LkcOLgsnsBQKBgG2b\njxgewY1Usr9idXVQBkqWS+TQz+zaK+nx+pvSII/VYCftQkTyyj5NHnEePwWYBhJo\n217TLTxpY+G4JjWOCdde1N+a0dSUYaG53labEpHf6u8mOjvcBRxMaifE4IvcfwoA\nMZhCrK4uOOJqU4RyRMgeXdEtSGWUhLzwi/c4bjLdAoGAO3hztXBNsK16QuBirxSk\nU4IjeFpMBvmsIqdiVwxDQdS2OFE+ZBM0JnNUaTy7irYX/A7j18wqBk5RHrk3yylA\nxl53X/jmvwSlzv9S1qwEts3SZUKjbmLm61taVW3v+5iLdRkJoa7YBUUEOOUJ4OOP\nlFpjCSYx5MS/R2brJE97DWU=\n-----END PRIVATE KEY-----\n",
//   "client_email": "assign-2-ai@assignment-2-444603.iam.gserviceaccount.com",
//   "client_id": "106686610902100169019",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/assign-2-ai%40assignment-2-444603.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
// `;
//         const base64Encoded = Buffer.from(stringToEncode).toString("base64");
//         console.log("Base64 Encoded:", base64Encoded);

        const credential = JSON.parse(
            Buffer.from(`ew0KICAidHlwZSI6ICJzZXJ2aWNlX2FjY291bnQiLA0KICAicHJvamVjdF9pZCI6ICJhc3NpZ25tZW50LTItNDQ0NjAzIiwNCiAgInByaXZhdGVfa2V5X2lkIjogImExYmVjNzJkYjQ0ZWFlOTFjNDk0YzBiNTllZmU3MWRiMThkOWQ2NDYiLA0KICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdlFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUNOdGVIL1pWeHNzUDVWXG5PS1Q5YTVXemhrMXhpSW9wcGFMTjBTRDZFNDJmTFJidWhmcDN0N0hlb0lRYWg5RXJ1Z25KSHZVWmU2TDZzb2V6XG5RdHpGWkc3dit3S295eldwTHB0RUovZThncjNUTjF0cWN3dW9UTzUwS0hlZE41a3JHRXhnd3VXSndzYldEVGVUXG5kbG9uLzlScEVWTFRIWkluUE9PODV2STVzNm5LR2pyQVhMTFkvOVkrN0IwN200dEUrcFJzYldkOHBaU1NGekpEXG5pUGdtbEdqTUFmN0V6QmIyZmVhaFR0aUx5UUxVSjJZc01MQ2dsOHlVRDFXbzEwb0lyOG8wbVFCOUFsdzJUTjZ3XG5wby9sejQrOHVaRUJLb2ZVem55b1B2blY1U2hRQmtxOWQyZGhJL2xuKy9HSm9TSzBmeXZlOHZid3lQQlFLMUdtXG56Vk9rZVFNbkFnTUJBQUVDZ2dFQUxiZXE5SEVuOHl6YXNIVzR6TVVqbzZwRlc4WllCSDJhVzFvSGtJWTBYMUQxXG5uL2Y3U1Jvck9RNkI3K2szTXlzdXN3TFl3ZUxnUG83UU5xWHdnWUlZUkRXdnN2TDBHZU9lVmN1cklkYndGSzg4XG5QOGhqejJVYVhNRWRiY3dkRHdra3d1YTlsTWNRek1ldzBWTVNYT3N0Qk1TQSt2a0VTTUpkR25sTFZoQS9TNkxWXG53ZzJEanFqNzl5bDNUeUQ5akM2S3YxYTVhZU1oQzVaVzE1SXFQL2xmYjJHekh3UzlpdFI4cFJZUXFoaGwrNFBUXG5hY2l4a3gyTEpRaDIvU2pBWTdZTHdhaTZoR1MrTFhYRUZreVptZmxJeUgzbys2eDN5QnNrcGgvTFFGTHZndEREXG5GRTBRcHU5REtNRnJuckxTUmdxQkh1eFhvZnRDbGE5VUhSbGtXT1c1T1FLQmdRQytwY3huY2xZY2t2dGtUWFpyXG5IdGh3WTVlelYvandtdmFUdzg1MGdDK2tPTE5ETHRrTnZuNVA4T2dhTVQwTXlqTWZIdWhibCsvQzhPNU4zYWhjXG5GUURKNjl1N05hN0duS0t0Yllmdk90WjlLa05ubmtjZ3Faa1hXSjEvQ3lwRUhVZE5FYWppajQydjkxdlo0dDhXXG5EaGF3cXA0RUErSk9uU3BJSDNPeTR6SGROUUtCZ1FDK1NaL1BSSGFmTUlyTnJSdnpuUkhGaFV5eE44TWRJa0JsXG53d1pmaXNxNWYrSjRBNlpXUkc3WDhjT1VMZk84OEVCT0FiR2hucEIvR2pFbFhiU244QXZCU2ladE84OEJ0ZHBkXG5GNnJ2eGxhbGRSRW1tQ2g4WXgvVmxlYUF3bjZNQjlUMzN1QnFRUElUb2JSTHo3TzJ2c2pHUWNRaFZOK3k4UlU4XG5ZSkwzVmdNV2F3S0JnUUNQWHRZUjhXMEt2Z29weXd0RDBZV0pONHhNeGRxaTdwYUNWeDA2aFcvT2V3bHNlNTJsXG5kVjArTnZnRlFvUWJ5eStZdHNDY3FPMFkxK0VPVTZRWjQzMmRYQzc1WVl5WE5oSXNoQk5XK0JOM08wSkhlVU1hXG5NQkM5K3RrdVFqSTkyUnJXdlhJWk4wV2hVRThWMDBSYkxLc3BucFdJaFhjNkVYMUxrY09MZ3Nuc0JRS0JnRzJiXG5qeGdld1kxVXNyOWlkWFZRQmtxV1MrVFF6K3phSytueCtwdlNJSS9WWUNmdFFrVHl5ajVOSG5FZVB3V1lCaEpvXG4yMTdUTFR4cFkrRzRKaldPQ2RkZTFOK2EwZFNVWWFHNTNsYWJFcEhmNnU4bU9qdmNCUnhNYWlmRTRJdmNmd29BXG5NWmhDcks0dU9PSnFVNFJ5Uk1nZVhkRXRTR1dVaEx6d2kvYzRiakxkQW9HQU8zaHp0WEJOc0sxNlF1QmlyeFNrXG5VNElqZUZwTUJ2bXNJcWRpVnd4RFFkUzJPRkUrWkJNMEpuTlVhVHk3aXJZWC9BN2oxOHdxQms1UkhyazN5eWxBXG54bDUzWC9qbXZ3U2x6djlTMXF3RXRzM1NaVUtqYm1MbTYxdGFWVzN2KzVpTGRSa0pvYTdZQlVVRU9PVUo0T09QXG5sRnBqQ1NZeDVNUy9SMmJySkU5N0RXVT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsDQogICJjbGllbnRfZW1haWwiOiAiYXNzaWduLTItYWlAYXNzaWdubWVudC0yLTQ0NDYwMy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsDQogICJjbGllbnRfaWQiOiAiMTA2Njg2NjEwOTAyMTAwMTY5MDE5IiwNCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwNCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsDQogICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwNCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvYXNzaWduLTItYWklNDBhc3NpZ25tZW50LTItNDQ0NjAzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwNCiAgInVuaXZlcnNlX2RvbWFpbiI6ICJnb29nbGVhcGlzLmNvbSINCn0=`, "base64").toString("utf-8"));

        console.log("credential: ", credential);

        // const credentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY);

        // const storage = new Storage({ keyFilename: keyFilePath });


        // const storage = new Storage({ credentials: credentials });
        const storage = new Storage({ credentials: {
            client_email: credential.client_email,
            private_key: credential.private_key,
          } });


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

