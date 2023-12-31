'use client'
import styles from './animelist.module.scss'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GridLoader } from 'react-spinners';

const override = {
    margin: '0 auto'
}

export default function AnimeList() {
    const [query, setQuery] = useState('')
    const [animeList, setAnimeList] = useState([])
    const [searchedType, setSearchedType] = useState()
    const [searchListType, setSearchListType] = useState('anime')
    const [status, setStatus] = useState('all')
    const [loading, setLoading] = useState(false)

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
        setLoading(true)

        fetch('api/getanimelist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: query, status: status, searchListType: searchListType})
        })
            .then(data => data.json())
            .then(data => {
                setSearchedType(searchListType)
                setAnimeList(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const loadPaginationData = async (url) => {
        setLoading(true)
        fetch('api/getpaginateanimelist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(url)
        }).then(data => data.json())
        .then(data =>{
            setAnimeList(data)
            setLoading(false)
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
        <div className={`${styles.animelistForm} + rounded-lg shadow-lg container mx-auto`}>
            <form className={`${styles.inputForm}`} method='POST' onSubmit={(e) => handleSubmit(e)} onReset={(e) => handleReset(e)}>
                <input type='text' className={`${styles.usernameInput} + rounded pl-4`} value={query} onChange={e => setQuery(e.target.value)} placeholder='MAL Username'></input>
                <div className={`${styles.listType}`}>
                    List Type
                    <fieldset className={`${styles.radioButtonFieldSet}`}>
                        <div className={`${styles.radioButton}`}>
                            <input type="radio" id="anime" name="listtype" value="anime" onChange={(e) => setSearchListType(e.target.value)} checked={searchListType === 'anime'}/>
                            <label className='block' htmlFor="anime">Anime</label>
                        </div>

                        <div>
                            <input type="radio" id="manga" name="listtype" value="manga" onChange={(e) => setSearchListType(e.target.value)} checked={searchListType === 'manga'}/>
                            <label className='block' htmlFor="manga">Manga</label>
                        </div>
                    </fieldset>
                </div>

                <div className='flex flex-col text-center'>
                    Status

                    <fieldset className={`${styles.radioButtonFieldSet}`}>
                        <div className={`${styles.radioButton}`}>
                            <input type="radio" id="all" name="status" value="all" onChange={(e) => setStatus(e.target.value)} checked={status === 'all'}/>
                            <label className='block' htmlFor="all">All</label>
                        </div>

                        {
                            searchListType === 'anime' ?
                            <div className={`${styles.radioButton}`}>
                                <input type="radio" id="watching" name="status" value="watching" onChange={(e) => setStatus(e.target.value)} checked={status === 'watching'}/>
                                <label className='block' htmlFor="watching">Watching</label>
                            </div> :
                            <div className={`${styles.radioButton}`}>
                                <input type="radio" id="reading" name="status" value="reading" onChange={(e) => setStatus(e.target.value)} checked={status === 'reading'}/>
                                <label className='block' htmlFor="reading">Reading</label>
                            </div>
                        }

                        <div className={`${styles.radioButton}`}>
                            <input type="radio" id="completed" name="status" value="completed" onChange={(e) => setStatus(e.target.value)} checked={status === 'completed'}/>
                            <label className='block' htmlFor="completed">Completed</label>
                        </div>

                        <div className={`${styles.radioButton}`}>
                            <input type="radio" id="on_hold" name="status" value="on_hold" onChange={(e) => setStatus(e.target.value)} checked={status === 'on_hold'}/>
                            <label className='block' htmlFor="on_hold">On Hold</label>
                        </div>

                        <div className={`${styles.radioButton}`}>
                            <input type="radio" id="dropped" name="status" value="dropped" onChange={(e) => setStatus(e.target.value)} checked={status === 'dropped'}/>
                            <label className='block' htmlFor="dropped">Dropped</label>
                        </div>

                        {
                            searchListType === 'anime' ?
                            <div className={`${styles.radioButton}`}>
                                <input type="radio" id="plan_to_watch" name="status" value="plan_to_watch" onChange={(e) => setStatus(e.target.value)} checked={status === 'plan_to_watch'}/>
                                <label className='block' htmlFor="plan_to_watch">Plan to Watch</label>
                            </div> :
                            <div className={`${styles.radioButton}`}>
                                <input type="radio" id="plan_to_read" name="status" value="plan_to_read" onChange={(e) => setStatus(e.target.value)} checked={status === 'plan_to_read'}/>
                                <label className='block' htmlFor="plan_to_read">Plan to Read</label>
                            </div>
                        }
                    </fieldset>
                </div>

                <div className={`${styles.buttons}`}>
                    <button type='reset' className={`${styles.search} + bg-blue-300`}>Reset</button>
                    <button type='submit' className={`${styles.search} + bg-red-300`}>Search</button>
                </div>
            </form>

            { loading ?
                    <GridLoader
                    loading={loading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    cssOverride={override}
                    color='#1E90FF'
                /> :
                animeList?.data?.length > 0 & animeList !== undefined & animeList !== null ?
                    <div className='flex-grow w-full px-12 grid grid-cols-5 gap-4'>
                        {animeList?.data?.map(datum => {
                            return(
                                <a key={datum.node.id} className={`${styles.animeImage}`} target='_blank'
                                    href={searchedType === 'anime' ? `https://myanimelist.net/anime/${datum.node.id}` : `https://myanimelist.net/manga/${datum.node.id}`}
                                    style={{ backgroundImage: `url(${datum.node.main_picture.large})`}}>
                                        <div className='
                                        bg-black bg-opacity-0 hover:bg-opacity-50
                                        opacity-0 hover:opacity-100
                                        transition-all duration-500
                                        h-full text-center justify-center align-middle flex flex-col
                                        text-xl text-white
                                        '>
                                            {datum.node.title}
                                        </div>
                                </a>
                            )
                        })}
                    </div>
                : <></>
            }

            <div className={`${loading ? 'hidden' : ''} + font-bold flex flex-row bottom-0 place-content-center gap-6 w-full mt-1`}>
                {animeList?.paging?.previous ? <div className={`${styles.paginationButton}`} onClick={() => loadPaginationData(`${animeList?.paging?.previous}`)}>Last 10</div> : <></>}

                {animeList?.paging?.next ? <div className={`${styles.paginationButton}`} onClick={() => loadPaginationData(`${animeList?.paging?.next}`)}>Next 10</div> : <></>}
            </div> 
        </div>
    )
}