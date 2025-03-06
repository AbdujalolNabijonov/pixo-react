import { MemberStatus, MemberType } from "../enum/member.enum";

export interface LoginInput {
    memberNick: string;
    memberPassword: string
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
    createdAt: Date
    updatedAt: Date
}