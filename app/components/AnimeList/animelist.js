'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AnimeList() {
    const [query, setQuery] = useState('')
    const [animeList, setAnimeList] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch('api/getanimelist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
            .then(data => data.json())
            .then(data => {
                setAnimeList(data)
                setQuery('')
            })
            .catch(err => console.log(err))
    }

    const loadPaginationData = async (url) => {
        fetch('api/getpaginateanimelist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(url)
        }).then(data => data.json())
        .then(data =>{
            setAnimeList(data)
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <form className='flex flex-col' method='POST' onSubmit={(e) => handleSubmit(e)}>
                Search for a specific user

                <input type='text' value={query} onChange={e => setQuery(e.target.value)} placeholder='MAL Username'></input>

                <button type='submit' className='bg-red-300 m-4 hover:cursor-pointer'>Search</button>
            </form>

                {animeList?.data?.length > 0 & animeList !== undefined & animeList !== null ?
                    <div className='flex flex-row flex-wrap bg-red-300 max-w-full h-96'>
                        {animeList?.data?.map(datum => {
                            return(
                                <div key={datum.node.id} className='mx-6'>
                                    <div className='h-32 w-32 relative'>
                                        <Image unoptimized fill src={`${datum.node.main_picture.large}`} alt={datum.node.title}/>
                                    </div>
                                    <div className='flex-wrap'>
                                        {datum.node.title}
                                    </div>
                                </div>
                            )
                        })}
                        <div className='flex flex-row place-content-center w-full bg-slate-50'>
                            {animeList?.paging?.previous ? <div onClick={() => loadPaginationData(`${animeList?.paging?.previous}`)}>View previous 10</div> : <div></div>}
                            {animeList?.paging?.next ? <div onClick={() => loadPaginationData(`${animeList?.paging?.next}`)}>View next 10</div> : <div>asdas</div>}
                        </div>
                    </div>
                : <></>}
        </div>
    )
}