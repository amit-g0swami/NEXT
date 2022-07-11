import { Comment } from "../typings"

export const fetchComments = async (tweetId: string) => {
    const res = await fetch(`http://localhost:3000/api/getComments?tweetId=${tweetId}`)

    const comments: Comment[] = await res.json()

    return comments
}