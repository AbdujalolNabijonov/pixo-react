import { Box, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import Members from "./members"
import Posts from "./posts"
import ChatMenu from "./chat"

const HomePage = (props: any) => {
    return (
        <Stack className="home-page">
            <Stack className="container">
                <Members />
                <Posts />
            </Stack>
            <ChatMenu />
        </Stack>
    )
}

export default BasicLayout(HomePage)