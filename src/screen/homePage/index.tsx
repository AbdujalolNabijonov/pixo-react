import { Pagination, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import Members from "./members"
import Posts from "./posts"

const HomePage = (props: any) => {
    return (
        <Stack className="home-page">
            <Stack className="container">
                <Members />
                <Posts />
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

export default BasicLayout(HomePage)