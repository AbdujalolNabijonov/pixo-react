import { AddReactionOutlined, FavoriteOutlined, QuestionAnswer, ReportGmailerrorredOutlined, Send, X } from "@mui/icons-material"
import { Avatar, Box, Divider, IconButton, Menu, Modal, Stack, ToggleButton } from "@mui/material"
import EmojiPicker from 'emoji-picker-react'
import { useState } from "react"
import { Post } from "../../libs/types/post"
import moment from "moment"
import { Comment } from "../../libs/types/comment"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert"
import useGlobal from "../../libs/hooks/useGlobal"
import { Message } from "../../libs/Message"
import CommentService from "../../service api/Comment.service"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import useDeviceDetect from "../../libs/hooks/useDeviceDetect"

interface CommentsInterface {
    openComment: boolean
    toggleCommentModal: any
    targetPost: Post | null
    comments: Comment[]
    setRebuildComments: any
    likeTargetPostHandler: any
}
const Comments = (props: CommentsInterface) => {
    const {
        openComment,
        toggleCommentModal,
        targetPost,
        comments,
        setRebuildComments,
        likeTargetPostHandler
    } = props
    const [openEmojiAnchor, setOpenEmojiAnchor] = useState(null)
    const [comment, setComment] = useState("")
    const { member } = useGlobal()
    const device = useDeviceDetect()
    const [disableBtn, setDisableBtn] = useState(false)

    const submitCommentRequest = async () => {
        try {
            if (!member?._id) throw new Error(Message.AUTHENTICATE_FIRST);
            if (!comment) throw new Error(Message.FULL_FILL_INPUTS);
            setDisableBtn(true)
            const commentService = new CommentService()
            await commentService.createComment({ commentContent: comment, commentTargetId: targetPost?._id as string });
            setRebuildComments(new Date())
            setComment("")
        } catch (err: any) {
            toggleCommentModal()
            await sweetErrorHandling(err)
        } finally {
            setDisableBtn(false)
        }
    }

    const toggleOpenEmoji = (e: any) => {
        if (!openEmojiAnchor) {
            setOpenEmojiAnchor(e.currentTarget)
        } else {
            setOpenEmojiAnchor(null)
        }
    }
    const pickEmojiHandler = (e: any) => {
        setComment(comment + e.emoji)
        setOpenEmojiAnchor(null)
    }
    const commentHandler = (e: any) => {
        setComment(e.target.value)
    }
    return (
        <Stack>
            <Modal
                open={openComment}
                onClose={toggleCommentModal}
                className={device === "mobile" ? "comment-modal-mobile" : "comment-modal"}
            >
                <Stack className="main-box">
                    <Box className="post-image">
                        <Swiper
                            slidesPerView={1}
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            className="comment-swiper"
                        >
                            {
                                targetPost?.postImages.map((image: string, index: number) => (
                                    <SwiperSlide className="comment-slide" key={index}>
                                        <img src={image} alt="post-image" />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </Box>
                    <Stack className="comments">
                        <Stack className="comment-head">
                            <Stack className="member-info">
                                <Avatar src={targetPost?.memberData?.memberImage ? targetPost.memberData.memberImage : "/imgs/default-user.jpg"} />
                                <Box>{targetPost?.memberData?.memberNick}</Box>
                            </Stack>
                            <ToggleButton value="left" onClick={toggleCommentModal}>
                                <X/>
                            </ToggleButton>
                        </Stack>
                        {
                            targetPost?.postContent || targetPost?.postTitle ? (
                                <Stack className="post-info">
                                    <Box>About Post</Box>
                                    <Box>{targetPost?.postTitle}</Box>
                                    <Box>
                                        {targetPost?.postContent}
                                    </Box>
                                </Stack>
                            ) : null
                        }
                        <Divider sx={{ borderColor: "white" }} />
                        <Stack className="comment-list">
                            {
                                comments && comments.length > 0 ?
                                    comments.map((comment: Comment, index: number) => (
                                        <Stack className="comment-item" key={index}>
                                            <Stack className="comment-item-head">
                                                <Stack className="comment-owner">
                                                    <Avatar src={comment.memberData?.memberImage ? comment.memberData?.memberImage : "/imgs/default-user.jpg"} />
                                                    <Stack className="owner-name">
                                                        <Box>{comment.memberData?.memberNick}</Box>
                                                        <Box>{moment(comment.createdAt).format("DD MMMM, YYYY")}</Box>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                            <Box className="comment-content">
                                                {comment.commentContent}
                                            </Box>
                                        </Stack>
                                    )) : (
                                        <Stack className="empty-post">
                                            <ReportGmailerrorredOutlined />
                                            <Box>There is no post!</Box>
                                        </Stack>
                                    )
                            }
                        </Stack>
                        <Stack className="post-stats">
                            <Stack className="post-stat">
                                <IconButton onClick={() => likeTargetPostHandler(targetPost?._id)}>
                                    <FavoriteOutlined
                                        sx={targetPost?.meLiked[0]?.meLiked ? { fill: "red" } : { fill: "white" }}
                                    />
                                </IconButton>
                                <Box>{targetPost?.postLikes}</Box>
                            </Stack>
                            <Stack className="post-stat">
                                <QuestionAnswer />
                                <Box>{targetPost?.postComments}</Box>
                            </Stack>
                        </Stack>
                        <Box className="post-time">{moment(targetPost?.createdAt).format("DD MMMM YYYY, hh:mm")}</Box>
                        <Divider sx={{ borderColor: "white" }} />
                        <Stack className="post-input">
                            <IconButton className="add-react" onClick={toggleOpenEmoji}><AddReactionOutlined /></IconButton>
                            <Menu
                                anchorEl={openEmojiAnchor}
                                open={Boolean(openEmojiAnchor)}
                                onClose={toggleOpenEmoji}
                            >
                                <EmojiPicker onEmojiClick={pickEmojiHandler} />
                            </Menu>
                            <input type="text" placeholder="Leave a comment ..." value={comment} onChange={commentHandler} onKeyDown={(e: any) => {
                                if (e.key === "Enter") {
                                    submitCommentRequest()
                                }
                            }} />
                            <IconButton className="send-post" onClick={submitCommentRequest} disabled={disableBtn}><Send /></IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        </Stack>
    )
}

export default Comments