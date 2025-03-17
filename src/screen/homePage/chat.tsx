import { Avatar, Box, IconButton, Menu, Stack } from "@mui/material"
import { RippleBadge } from "../../libs/mui/rippleBadge"
import { AddReactionOutlined, Send } from "@mui/icons-material"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useState } from "react"
import useSocket from "../../libs/hooks/useSocket"
import Cookies from "universal-cookie"
import { InfoMessage, NewMessage } from "../../libs/types/socket"
import useGlobal from "../../libs/hooks/useGlobal"
import moment from "moment"
import { sweetErrorHandling } from "../../libs/sweetAlert"
import { Message } from "../../libs/Message"
import useDeviceDetect from "../../libs/hooks/useDeviceDetect"

const ChatMenu = () => {
    const [openEmojiAnchor, setOpenEmojiAnchor] = useState(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<NewMessage[]>([])
    const [totalClients, setTotalClients] = useState<number>(0)
    const cookie = new Cookies();
    const device = useDeviceDetect()
    const token = cookie.get("accessToken")
    const socket = useSocket(token)
    const { member } = useGlobal()

    useEffect(() => {
        socket?.on("infoMessage", (data) => {
            const infoMessage = JSON.parse(data) as InfoMessage
            setTotalClients(infoMessage.totalClients)
        })
        socket?.on("message", (data) => {
            const messages = JSON.parse(data) as NewMessage[];
            setMessages(messages)
            console.log(messages)
        })
    }, [socket])

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
    const sendMessageHandler = async () => {
        try {
            if (!message) throw new Error(Message.FULL_FILL_INPUTS);
            socket?.emit("message", JSON.stringify({ text: message }))
            setMessage("")
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="chat-menu">
            <Stack className="chat-head">
                <Box>
                    Community Chat
                </Box>
                <Box>
                    <RippleBadge badgeContent={totalClients} />
                </Box>
            </Stack>
            <Stack className="chat-body">
                {
                    messages.map((message: NewMessage) => {
                        if (message.memberData?._id !== member?._id) {
                            console.log(message.memberData?.memberImage)
                            return (
                                <Stack className="msg-left msg">
                                    <Avatar src={message.memberData?.memberImage ?? "/imgs/default-user.jpg"} />
                                    <Stack className="msg-body">
                                        <Box className="member-name">{message.memberData?.memberNick ?? "GUEST"}</Box>
                                        <Box className="msg-content">{message.message}</Box>
                                        <Box className="msg-date">{moment(message.date).format("DD MMMM, YYYY")}</Box>
                                    </Stack>
                                </Stack>
                            )
                        } else {
                            return (
                                <Stack className="msg-right msg">
                                    <Stack className="msg-body">
                                        <Box className="member-name">{message.memberData?.memberNick ?? "GUEST"}</Box>
                                        <Box className="msg-content">{message.message}</Box>
                                        <Box className="msg-date">{moment(message.date).format("DD MMMM, YYYY")}</Box>
                                    </Stack>
                                </Stack>
                            )
                        }
                    })
                }
            </Stack>
            <Stack className="chat-footer">
                {
                    device === "desktop" ? (
                        <IconButton className="add-react" onClick={toggleOpenEmoji}><AddReactionOutlined /></IconButton>
                    ) : null
                }
                <Menu
                    anchorEl={openEmojiAnchor}
                    open={Boolean(openEmojiAnchor)}
                    onClose={toggleOpenEmoji}
                >
                    <EmojiPicker onEmojiClick={pickEmojiHandler} />
                </Menu>
                <input type="text" placeholder="Leave a comment ..." value={message} onChange={changeMessageHandler} />
                <IconButton className="send-post" onClick={sendMessageHandler}><Send /></IconButton>
            </Stack>
        </Stack>
    )
}

export default ChatMenu