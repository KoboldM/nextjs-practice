const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID
import { NextResponse } from 'next/server';

//to add get??? or smth

export async function POST(req) {
    const data = await req.json()
    console.log(data)

    let apiResponse = {}
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
        },
        method: 'GET'
    }

    await fetch(`https://api.myanimelist.net/v2/users/${data.query}/${data.searchListType === 'anime' ? 'animelist' : 'mangalist'}${data.status === 'all' ? '' : `?status=${data.status}`}`, config)
    .then(data => data.json())
    .then(data => {
        apiResponse = data
    })
    .catch(err => {
        apiResponse = err
    })
    
    return NextResponse.json(apiResponse);
}