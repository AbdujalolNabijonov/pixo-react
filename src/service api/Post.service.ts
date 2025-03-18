import axios from "axios";
import { serverApi } from "../libs/config";
import { Post, Posts, PostsInquiry } from "../libs/types/post";

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

    public async createPost(formData: any): Promise<Post> {
        try {
            const url = `${this.serverApi}/post/createpost`
            const response = await axios.post(url, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            })
            return response.data.value
        } catch (err: any) {
            console.log(`Error: createPost, ${err.response.data.message}`)
            throw err.response.data
        }
    }

    public async getPost(targetPostId: string): Promise<Post> {
        try {
            const url = `${this.serverApi}/post/${targetPostId}`
            const response = await axios.get(url, { withCredentials: true })
            return response.data.value
        } catch (err: any) {
            console.log(`Error: getPost, ${err.response.data.message}`)
            throw err.response.data
        }
    }

    public async likeTargetPost(postId: string): Promise<Post> {
        try {
            const url = `${this.serverApi}/post/like/${postId}`
            const response = await axios.post(url, null, {
                withCredentials: true
            })
            return response.data.value
        } catch (err: any) {
            console.log(`Error: likeTargetPost, ${err.response.data.message}`)
            throw err.response.data
        }
    }

    public async getFavorityPosts(data: PostsInquiry): Promise<Posts> {
        try {
            const url = `${this.serverApi}/post/favorite-posts`
            const response = await axios.post(url, data, {
                withCredentials: true
            })
            return response.data.value
        } catch (err: any) {
            console.log(`Error: getFavorityPosts, ${err.response.data.message}`)
            throw err.response.data
        }
    }

    public async deleteTargetPost(postId: string): Promise<Post> {
        try {
            const url = `${this.serverApi}/post/delete/${postId}`
            const response = await axios.post(url, null, {
                withCredentials: true
            })
            return response.data.value
        } catch (err: any) {
            console.log(`Error: deleteTargetPost, ${err.response.data.message}`)
            throw err.response.data
        }
    }
}

export default PostService