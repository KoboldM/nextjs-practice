const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID
import { NextResponse } from 'next/server';

export async function GET() {
    let apiResponse = {}
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
        },
        method: 'GET'
    }

    await fetch('https://api.myanimelist.net/v2/users/KoboldM/animelist', config)
    .then(data => data.json())
    .then(data => {
        apiResponse = data
    })
    .catch(err => {
        apiResponse = err
    })
    
    return NextResponse.json(apiResponse);
}