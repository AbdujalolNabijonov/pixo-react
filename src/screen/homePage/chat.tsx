import { Avatar, Box, IconButton, Menu, Stack } from "@mui/material"
import { RippleBadge } from "../../libs/mui/rippleBadge"
import { AddReactionOutlined, Send } from "@mui/icons-material"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"

const ChatMenu = () => {
    const [openEmojiAnchor, setOpenEmojiAnchor] = useState(null)
    const [message, setMessage] = useState("")

    const toggleOpenEmoji = (e: any) => {
        if (!openEmojiAnchor) {
            setOpenEmojiAnchor(e.currentTarget)
        } else {
            setOpenEmojiAnchor(null)
        }
    }

    const pickEmojiHandler = (e: any) => {
        setMessage(message + e.emoji)
        setOpenEmojiAnchor(null)
    }

    const changeMessageHandler = (e: any) => {
        setMessage(e.target.value)
    }
    return (
        <Stack className="chat-menu">
            <Stack className="chat-head">
                <Box>
                    Community Chat
                </Box>
                <Box>
                    <RippleBadge badgeContent="2" />
                </Box>
            </Stack>
            <Stack className="chat-body">
                <Stack className="msg-left msg">
                    <Avatar />
                    <Stack className="msg-body">
                        <Box className="member-name">Hohn washington</Box>
                        <Box className="msg-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Box>
                        <Box className="msg-date">27 feb, 20:00</Box>
                    </Stack>
                </Stack>
                <Stack className="msg-right msg">
                    <Stack className="msg-body">
                        <Box className="member-name">Hohn washington</Box>
                        <Box className="msg-content">Lorem is</Box>
                        <Box className="msg-date">27 feb, 20:00</Box>
                    </Stack>
                    <Avatar />
                </Stack>
            </Stack>
            <Stack className="chat-footer">
                <IconButton className="add-react" onClick={toggleOpenEmoji}><AddReactionOutlined /></IconButton>
                <Menu
                    anchorEl={openEmojiAnchor}
                    open={Boolean(openEmojiAnchor)}
                    onClose={toggleOpenEmoji}
                >
                    <EmojiPicker onEmojiClick={pickEmojiHandler} />
                </Menu>
                <input type="text" placeholder="Leave a comment ..." value={message} onChange={changeMessageHandler} />
                <IconButton className="send-post"><Send /></IconButton>
            </Stack>
        </Stack>
    )
}

export default ChatMenu