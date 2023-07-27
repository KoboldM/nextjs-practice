'use client'

import Image from 'next/image'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function AnimeList() {
    const { data, error, isLoading } = useSWR('/api/getanimelist', fetcher, {
        revalidateOnFocus: false,
        // revalidateOnMount: false,
        revalidateIfStale: false,
        // revalidateOnReconnect: false,
        // refreshWhenHidden: false,
        // refreshInterval: 86400,
        // refreshWhenOffline: false
    })

    if(error) return <div>Failed to load</div>
    if(isLoading) return <div>Loading...</div>

    return(
        <div className='flex flex-row flex-wrap bg-red-300 max-w-full h-96'>
            {/* {console.log(data.data[0].node.main_picture)} */}
            {data?.data?.map(datum => {
                return(
                    <div key={datum.node.id} className='mx-6'>
                        <div className='h-32 w-32 relative'>
                            <Image unoptimized fill src={`${datum.node.main_picture.large}`} alt={datum.node.title}/>
                        </div>
                        {datum.node.title}
                    </div>
                )
            })}
        </div>
    )
}
