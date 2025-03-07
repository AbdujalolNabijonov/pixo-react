import { AddReactionOutlined, Comment, Favorite, FavoriteOutlined, QuestionAnswer, Send, X } from "@mui/icons-material"
import { Avatar, Box, Divider, IconButton, Menu, Modal, Stack } from "@mui/material"
import EmojiPicker from 'emoji-picker-react'
import { useState } from "react"

interface CommentsInterface {
    openComment: boolean
    toggleCommentModal: any
}
const Comments = (props: CommentsInterface) => {
    const { openComment, toggleCommentModal } = props
    const [openEmojiAnchor, setOpenEmojiAnchor] = useState(null)
    const [comment, setComment] = useState("")
    const toggleOpenEmoji = (e: any) => {
        if (!openEmojiAnchor) {
            setOpenEmojiAnchor(e.currentTarget)
        } else {
            setOpenEmojiAnchor(null)
        }
    }
    const pickEmojiHandler = (e: any) => {
        setComment(comment+e.emoji)
        setOpenEmojiAnchor(null)
    }
    const commentHandler = (e:any)=>{
        setComment(e.target.value)
    }
    return (
        <Stack>
            <Modal
                open={openComment}
                onClose={toggleCommentModal}
                className={"comment-modal"}
            >
                <Stack className="main-box">
                    <Box className="post-image">
                        <img src="/imgs/moon.jpg" alt="post-image" />
                    </Box>
                    <Stack className="comments">
                        <Stack className="member-info">
                            <Avatar src="/imgs/default-user.jpg" />
                            <Box>Martin</Box>
                        </Stack>
                        <Divider sx={{ borderColor: "white" }} />
                        <Stack className="post-info">
                            <Box>Javascript is the best language</Box>
                            <Box>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Box>
                        </Stack>
                        <Divider sx={{ borderColor: "white" }} />
                        <Stack className="comment-list">
                            {
                                Array.from({ length: 10 }).map((key, index: number) => (
                                    <Stack className="comment-item">
                                        <Stack className="comment-item-head">
                                            <Stack className="comment-owner">
                                                <Avatar src="/imgs/default-user.jpg" />
                                                <Stack className="owner-name">
                                                    <Box>William Shekspear</Box>
                                                    <Box>27 FEB, 2027</Box>
                                                </Stack>
                                            </Stack>
                                            <Stack className="post-stat">
                                                <FavoriteOutlined sx={{ fill: "red" }} />
                                                <Box>12</Box>
                                            </Stack>
                                        </Stack>
                                        <Box className="comment-content">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                        </Box>
                                    </Stack>
                                ))
                            }
                        </Stack>
                        <Stack className="post-stats">
                            <Stack className="post-stat">
                                <FavoriteOutlined sx={{ fill: "red" }} />
                                <Box>12</Box>
                            </Stack>
                            <Stack className="post-stat">
                                <QuestionAnswer />
                                <Box>10</Box>
                            </Stack>
                        </Stack>
                        <Box className="post-time">23 Feb, 2023</Box>
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
                            <input type="text" placeholder="Leave a comment ..." value={comment} onChange={commentHandler}/>
                            <IconButton className="send-post"><Send/></IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        </Stack>
    )
}

export default Comments