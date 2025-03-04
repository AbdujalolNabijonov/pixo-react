import { Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"

const PostPage = ()=>{
    return (
    <Stack>
        <h1>THIS IS post page</h1>
        <a href="/memberpage">Member Page</a>
    </Stack>
    )
}

export default BasicLayout(PostPage)