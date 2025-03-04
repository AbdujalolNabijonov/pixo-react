import { Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"

const MemberPage = () => {
    return (
        <Stack>
            <h1>This is my page</h1>
            <a href="/">Home</a>
        </Stack>
    )
}

export default BasicLayout(MemberPage)