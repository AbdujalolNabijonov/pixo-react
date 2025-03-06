import { Avatar, Box, Divider, Pagination, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import { Favorite, QuestionAnswerOutlined } from "@mui/icons-material"

const PostPage = () => {
    return (
        <Stack className="post-page">
            <Stack className="container">
                <Stack className="search">
                    <input type="text" placeholder="What post are you looking for?..." />
                </Stack>
                <Stack className="post-list">
                    {Array.from({ length: 15 }).map((key, index: number) => (
                        <Box className={`explore-item`}>
                            <img src="/imgs/man.jpg" alt="" />
                            <Stack className="explore-body">
                                <Stack className="post-title">
                                    <Box>
                                        Post Title
                                    </Box>
                                    <Box>
                                        27 Feb, 2025
                                    </Box>
                                </Stack>
                                <Divider sx={{ borderBottomColor: "white" }} variant="middle"/>
                                <Stack className="post-content">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised i
                                </Stack>
                                <Divider sx={{ borderBottomColor: "white" }} />
                                <Stack className="explore-footer">
                                    <Stack className="member-info">
                                        <Avatar />
                                        <Box>Martin</Box>
                                    </Stack>
                                    <Stack className="explore-stats">
                                        <Stack className="stats-item">
                                            <Favorite />
                                            <Box>12</Box>
                                        </Stack>
                                        <Stack className="stats-item">
                                            <QuestionAnswerOutlined />
                                            <Box>10</Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Box className="explore-body-wrapper"></Box>
                        </Box>
                    ))}
                </Stack>
                <Pagination
                    className="pagination"
                    count={3}
                    page={1}
                    color="secondary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Stack>
    )
}

export default BasicLayout(PostPage)