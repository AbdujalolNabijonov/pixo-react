import { Box, Pagination, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"

const PostPage = () => {
    return (
        <Stack className="post-page">
            <Stack className="container">
                <Stack className="search">
                    <input type="text" placeholder="What post are you looking for?..." />
                </Stack>
                <Stack className="post-list">
                    {Array.from({ length: 15 }).map((key, index: number) => (
                        <Box className={`explore-item ${[4, 5].includes(index % 10) ? "tall" : ""}`}>
                            <img src="/imgs/man.jpg" alt="" />
                        </Box>
                    ))}
                </Stack>
                <Pagination
                    className="pagination"
                    count={10}
                    color="secondary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Stack>
    )
}

export default BasicLayout(PostPage)