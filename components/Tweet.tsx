import React from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
} from '@heroicons/react/outline'

interface Props {
    tweet: Tweet
}


function Tweet({ tweet }: Props) {
    return (
        <div
            key={tweet._id}
            className="flex flex-col space-x-3 border-y border-gray-100 p-5"
        >
            <div className="flex space-x-3">
                <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={tweet.profileImg || 'https://links.papareact.com/gll'}
                    alt=""
                />

                <div>
                    <div className="flex items-center space-x-1">
                        <p className="mr-1 font-bold">{tweet.username}</p>
                        <p className="hidden text-sm text-gray-500 sm:inline">
                            @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
                        </p>

                        <TimeAgo
                            className="text-sm text-gray-500"
                            date={tweet._createdAt}
                        />
                    </div>

                    <p className="pt-1">{tweet.text}</p>

                    {tweet.image && (
                        <img
                            src={tweet.image}
                            className="m-5 ml-0 mb-1 max-h-60  rounded-lg object-cover shadow-sm"
                            alt=""
                        />
                    )}
                </div>
            </div>
            <div className="mt-5 flex justify-between">
                <div
                    className="flex cursor-pointer items-center space-x-3 text-gray-400 hover:text-blue-300"
                >
                    <ChatAlt2Icon className="h-8 w-8 rounded-full p-1.5 hover:bg-blue-50" />
                    <p className="hover:text-blue-300">2</p>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 rounded-full text-gray-400 hover:bg-green-100 hover:text-green-400">
                    <SwitchHorizontalIcon className="h-8 w-8 rounded-full p-1.5" />
                </div>
                <div
                    className="flex cursor-pointer items-center space-x-3 text-gray-400 hover:text-[#f91800]"
                >
                    <HeartIcon className="h-8 w-8 rounded-full p-1.5 hover:bg-pink-100" />
                    <p>23</p>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 pr-1 text-gray-400 hover:text-blue-300">
                    <UploadIcon className="h-8 w-8 rounded-full p-1.5 hover:bg-blue-100" />
                </div>
            </div>
        </div>
    )
}

export default Tweet