import { Favorite, FavoriteOutlined, QuestionAnswerOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Stack } from "@mui/material"

const Posts = (props: any) => {
    return (
        <Stack className="posts">
            {Array.from({ length: 10 }).map(() => (
                <Stack className="post">
                    <Stack className="post-head">
                        <Box className="member-image">
                            <Avatar src="/imgs/man.jpg" className="" />
                        </Box>
                        <Stack className="member-name">
                            <Box>Martin</Box>
                            <Box>27 Feb, 2025</Box>
                        </Stack>
                    </Stack>
                    <Stack className="post-body">
                        <img src="/imgs/tree.jpeg" alt="" />
                    </Stack>
                    <Stack className="post-footer">
                        <Stack className="post-stats">
                            <Stack className="post-stats-item">
                                <FavoriteOutlined />
                                <Box>12</Box>
                            </Stack>
                            <Stack className="post-stats-item">
                                <QuestionAnswerOutlined />
                                <Box>10</Box>
                            </Stack>
                        </Stack>
                        <Stack className="post-input">
                            <input type="text" placeholder="Add a comment..." />
                            <Button variant="outlined" color="warning">post</Button>
                        </Stack>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
}

export default Posts