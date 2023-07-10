import PlaySuggestionCard from '../component/PlaySuggestionCard';
import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const RelatedVideos = ({ loading, relatedVdos }) => {
    

    const array = Array(12).fill(0);
    // console.log(relatedVdos)
    return (
        <div className='pt-2 grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 justify-items-center lg:w-[30%]'>
            {loading ? array.map((elm,index) => (
                <SkeletonTheme key={index} highlightColor="#aaa" baseColor='#9b9b9b'>
                    <div  className="  w-[90%] h-96 rounded-md flex flex-col gap-4">
                        <Skeleton className='h-28' borderRadius="8px" />
                        <div className="flex w-full h-28 justify-between">
                            <div className="h-full flex pt-2 justify-start w-[19%]">
                                <Skeleton circle className='h-12 w-12' />
                            </div>
                            <div className="flex flex-col gap-2 w-[81%]">
                                <Skeleton className='h-8' />
                                <Skeleton className='h-8' />
                                <Skeleton className='h-8' />
                            </div>
                        </div>
                    </div>
                </SkeletonTheme>
            )):
                relatedVdos?.map(({ videoId, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, richThumbnail, lengthText, channelId }) => {
                    if (channelThumbnail && thumbnail)
                        return <PlaySuggestionCard key={thumbnail[0].url} thumb={thumbnail} link={videoId} description={title} channel_name={channelTitle} channel_logo={channelThumbnail} views={viewCount} time={publishedTimeText} channelId={channelId} />

                    else
                        return null
                })
            }
        </div>
    )
}

export default RelatedVideos
