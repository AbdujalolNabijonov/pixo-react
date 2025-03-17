import { Stack } from "@mui/material"
import Members from "./members"
import Posts from "./posts"
import ChatMenu from "./chat"
import useDeviceDetect from "../../libs/hooks/useDeviceDetect"

const HomePage = (props: any) => {
    const device = useDeviceDetect();
    if (device === "mobile") {
        return (
            <Stack className="home-page">
                <Stack className="container">
                    <Members />
                    <Posts />
                </Stack>
            </Stack>
        )
    } else {
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
}



export default HomePage