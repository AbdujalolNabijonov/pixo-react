import { Member, MetaCounter } from "./member"


export interface CommentInput {
    commentContent: string;
    commentTargetId: string
}

export interface Comment {
    _id: string;
    memberId: string;
    commentContent: string;
    commentTargetId: string;
    commentLikes: number;
    memberData?: Member
    createdAt: Date;
    updatedAt: Date;

}
export interface Comments {
    list: []
    metaCounter: MetaCounter[]
}