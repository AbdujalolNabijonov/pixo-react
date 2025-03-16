import { MemberStatus, MemberType } from "../enum/member.enum";
import { MeLiked } from "./post";

export interface LoginInput {
    memberNick: string;
    memberPassword: string
}

export interface SignupInput {
    memberNick: string;
    memberPassword: string
    memberPhone: string
}

export interface Member {
    _id: string
    memberType: MemberType
    memberStatus: MemberStatus
    memberNick: string
    memberPhone: string
    memberImage?: string
    memberDesc?: string
    memberPosts: number
    memberWarnings: number
    memberLikes: number
    meLiked: MeLiked[]
    createdAt: Date
    updatedAt: Date
}

export interface Members {
    list: Member[];
    metaCounter: MetaCounter[]
}

export interface MetaCounter {
    total: number
}