import { Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"

const HomePage = (props: any) => {
    return (
        <Stack className="home-page">
            <h1>This is Home Page</h1>
            <a href="/posts">Posts</a>
        </Stack>
    )
}

export default BasicLayout(HomePage)