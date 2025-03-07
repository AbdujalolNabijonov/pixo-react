import { Box, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import Members from "./members"
import Posts from "./posts"

const HomePage = (props: any) => {
    return (
        <Stack className="home-page">
            <Stack className="container">
                <Members />
                <Posts />
            </Stack>
        </Stack>
    )
}

export default BasicLayout(HomePage)