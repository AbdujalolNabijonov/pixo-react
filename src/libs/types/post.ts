import { PostStatus } from "../enum/pots.enum"
import { Member, MetaCounter } from "./member"

export interface Post {
    _id: string
    memberId: string
    postTitle?: string
    postContent?: string
    postImages: string[]
    postStatus: PostStatus
    memberData?: Member
    postLikes: number
    postViews: number
    postComments: number
    meLiked: MeLiked[]
    createdAt: Date
    updatedAt: Date
}
export interface MeLiked {
    likeTargetId?: string;
    memberId?: string;
    meLiked?: boolean
}

export interface Posts {
    list: Post[]
    metaCounter: MetaCounter[]
}

export interface PostsInquiry {
    page: number,
    limit: number,
    order?: string,
    direction?: number,
    search: PSearch
}

interface PSearch {
    memberId?: string
    text?: string
}