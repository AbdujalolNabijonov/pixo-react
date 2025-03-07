import axios from "axios";
import { serverApi } from "../libs/config"
import { CommentInput, Comments } from "../libs/types/comment"

class CommentService {
    serverApi
    constructor() {
        this.serverApi = serverApi
    }

    public async createComment(data: CommentInput): Promise<Comment> {
        try {
            const url = `${this.serverApi}/comment/create-comment`;
            const response = await axios.post(url, data, { withCredentials: true })
            return response.data.value
        } catch (err: any) {
            throw err.response.data
        }
    }

    public async getComments(commentTargetId: string): Promise<Comments> {
        try {
            const url = `${this.serverApi}/comment/comments`;
            const response = await axios.post(url, { commentTargetId: commentTargetId }, { withCredentials: true })
            return response.data.value
        } catch (err: any) {
            console.log(`Error: getComments, ${err.response.data?.message}`)
            throw err.response.data
        }
    }
}

export default CommentService