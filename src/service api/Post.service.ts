import axios from "axios";
import { serverApi } from "../libs/config";
import { Posts, PostsInquiry } from "../libs/types/post";

class PostService {
    serverApi
    constructor() {
        this.serverApi = serverApi
    }

    public async getPosts(data: PostsInquiry): Promise<Posts> {
        try {
            const url = `${this.serverApi}/post/posts`;
            const response = await axios.post(url, data, { withCredentials: true });
            return response.data.value
        } catch (err: any) {
            console.log(`Error: getPosts, ${err.response.data?.message}`)
            throw err.response.data
        }
    }
}

export default PostService