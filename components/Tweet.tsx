import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import toast from 'react-hot-toast'

interface Props {
    tweet: Tweet
}

function Tweet({ tweet }: Props) {
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const [comments, setComments] = useState<Comment[]>([])
    const [likesCount, setLikesCount] = useState(0)

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }

    useEffect(() => {
        refreshComments()
    }, [])

    const handleLikeCountHandler = () => {
        setLikesCount(likesCount + 1)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const commentToast = toast.loading('Posting Comment...')

        toast.success('Comment Posted!', {
            id: commentToast,
        })

        setInput('')
        setCommentBoxVisible(false)
        refreshComments()
    }

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
                    onClick={(e) => setCommentBoxVisible(!commentBoxVisible)}
                    className="flex cursor-pointer items-center space-x-3 text-gray-400 hover:text-blue-300"
                >
                    <ChatAlt2Icon className="h-8 w-8 rounded-full p-1.5 hover:bg-blue-50" />
                    <p className="hover:text-blue-300">{comments.length}</p>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 rounded-full text-gray-400 hover:bg-green-100 hover:text-green-400">
                    <SwitchHorizontalIcon className="h-8 w-8 rounded-full p-1.5" />
                </div>
                <div
                    className="flex cursor-pointer items-center space-x-3 text-gray-400 hover:text-[#f91800]"
                    onClick={handleLikeCountHandler}
                >
                    <HeartIcon className="h-8 w-8 rounded-full p-1.5 hover:bg-pink-100" />
                    <p>{likesCount}</p>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 pr-1 text-gray-400 hover:text-blue-300">
                    <UploadIcon className="h-8 w-8 rounded-full p-1.5 hover:bg-blue-100" />
                </div>
            </div>

            {commentBoxVisible && (
                <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
                        type="text"
                        placeholder="Write a comment..."
                    />
                    <button
                        disabled={!input}
                        className="text-twitter disabled:text-gray-200"
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            )}

            {comments?.length > 0 && (
                <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
                    {comments.map((comment) => (
                        <div key={comment._id} className="relative flex space-x-2">
                            <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
                            <img
                                src={comment.profileImg}
                                className="mt-2 h-7 w-7 rounded-full object-cover"
                                alt=""
                            />
                            <div>
                                <div className="flex items-center space-x-1">
                                    <p className="mr-1 font-bold">{comment.username}</p>
                                    <p className="hidden text-sm text-gray-500 lg:inline">
                                        @{comment.username.replace(/\s+/g, '').toLowerCase()} ·
                                    </p>

                                    <TimeAgo
                                        className="text-sm text-gray-500"
                                        date={comment._createdAt}
                                    />
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Tweet