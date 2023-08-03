'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AnimeList() {
    const [query, setQuery] = useState('')
    const [animeList, setAnimeList] = useState([])
    const [searchListType, setSearchListType] = useState('anime')
    const [status, setStatus] = useState('all')

    useEffect(() => {
        // this can possibly be less weird looking w nested switch case but idk
        if(searchListType === 'manga' && status === 'watching') {
            setStatus('reading')
        }
        if(searchListType === 'manga' && status === 'plan_to_watch') {
            setStatus('plan_to_read')
        }
        if(searchListType === 'anime' && status === 'reading') {
            setStatus('watching')
        }
        if(searchListType === 'anime' && status === 'plan_to_read') {
            setStatus('plan_to_watch')
        }
    }, [searchListType, status])

    const handleSubmit = async (e) => {
        e.preventDefault()

        fetch('api/getanimelist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: query, status: status, searchListType: searchListType})
        })
            .then(data => data.json())
            .then(data => {
                setAnimeList(data)
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

    const handleReset = (e) => {
        setQuery('')
        setAnimeList([])
        setSearchListType('anime')
        setStatus('all')
    }

    return(
        <div className='bg-slate-300 w-full'>
            <form className='flex flex-col' method='POST' onSubmit={(e) => handleSubmit(e)} onReset={(e) => handleReset(e)}>
                Search for a specific user

                <input type='text' value={query} onChange={e => setQuery(e.target.value)} placeholder='MAL Username'></input>

                <div className='bg-slate-50 flex flex-col'>
                    Anime/Manga List
                    <div>
                        <input type="radio" id="anime" name="listtype" value="anime" onChange={(e) => setSearchListType(e.target.value)} checked={searchListType === 'anime'}/>
                        <label htmlFor="anime">Anime</label>
                    </div>

                    <div>
                        <input type="radio" id="manga" name="listtype" value="manga" onChange={(e) => setSearchListType(e.target.value)} checked={searchListType === 'manga'}/>
                        <label htmlFor="manga">Manga</label>
                    </div>
                </div>

                <div className='bg-slate-50 flex flex-col'>
                    Status:

                    <div>
                        <input type="radio" id="all" name="status" value="all" onChange={(e) => setStatus(e.target.value)} checked={status === 'all'}/>
                        <label htmlFor="all">All</label>
                    </div>

                    {
                        searchListType === 'anime' ?
                        <div>
                            <input type="radio" id="watching" name="status" value="watching" onChange={(e) => setStatus(e.target.value)} checked={status === 'watching'}/>
                            <label htmlFor="watching">Watching</label>
                        </div> :
                        <div>
                            <input type="radio" id="reading" name="status" value="reading" onChange={(e) => setStatus(e.target.value)} checked={status === 'reading'}/>
                            <label htmlFor="reading">Reading</label>
                        </div>
                    }

                    <div>
                        <input type="radio" id="completed" name="status" value="completed" onChange={(e) => setStatus(e.target.value)} checked={status === 'completed'}/>
                        <label htmlFor="completed">Completed</label>
                    </div>

                    <div>
                        <input type="radio" id="on_hold" name="status" value="on_hold" onChange={(e) => setStatus(e.target.value)} checked={status === 'on_hold'}/>
                        <label htmlFor="on_hold">On Hold</label>
                    </div>

                    <div>
                        <input type="radio" id="dropped" name="status" value="dropped" onChange={(e) => setStatus(e.target.value)} checked={status === 'dropped'}/>
                        <label htmlFor="dropped">Dropped</label>
                    </div>

                    {
                        searchListType === 'anime' ?
                        <div>
                            <input type="radio" id="plan_to_watch" name="status" value="plan_to_watch" onChange={(e) => setStatus(e.target.value)} checked={status === 'plan_to_watch'}/>
                            <label htmlFor="plan_to_watch">Plan to Watch</label>
                        </div> :
                        <div>
                            <input type="radio" id="plan_to_read" name="status" value="plan_to_read" onChange={(e) => setStatus(e.target.value)} checked={status === 'plan_to_read'}/>
                            <label htmlFor="plan_to_read">Plan to Read</label>
                        </div>
                    }
                    
                </div>

                <button type='submit' className='bg-red-300 m-4 hover:cursor-pointer'>Search</button>
                <button type='reset' className='bg-blue-300 m-4 hover:cursor-pointer'>Reset</button>
            </form>

                {animeList?.data?.length > 0 & animeList !== undefined & animeList !== null ?
                    <div className='flex flex-row flex-wrap bg-gray-300 w-full h-96'>
                        {animeList?.data?.map(datum => {
                            return(
                                <div key={datum.node.id} className='mx-6'>
                                    <div className='h-32 w-32 relative'>
                                        <Image unoptimized fill src={`${datum.node.main_picture.large}`} alt={datum.node.title}/>
                                    </div>
                                    {/* <div className='flex-wrap'> */}
                                        {datum.node.title}
                                    {/* </div> */}
                                </div>
                            )
                        })}
                        <div className='flex flex-row place-content-center w-full bg-slate-50'>
                            {animeList?.paging?.previous ? <div onClick={() => loadPaginationData(`${animeList?.paging?.previous}`)}>View previous 10</div> : <div></div>}

                            {animeList?.paging?.next ? <div onClick={() => loadPaginationData(`${animeList?.paging?.next}`)}>View next 10</div> : <div></div>}
                        </div>
                    </div>
                : <></>}
        </div>
    )
}