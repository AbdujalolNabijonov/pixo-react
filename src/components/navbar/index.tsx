import React from "react"
import { Avatar, Box, MenuItem, Stack } from "@mui/material"
import { Home, Menu, Search } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { CameraPlus, House } from "@phosphor-icons/react"


const Navbar = () => {
    const device: string = "desktop"
    const navigate = useNavigate()
    const routerPath = useLocation().pathname

    const navigateHandler = (path: string) => {
        navigate(path)
    }
    if (device === "mobile") {
        return (
            <Stack>
                This is mobile navbars
            </Stack>
        )
    } else {
        return (
            <Stack className="navbar-main">
                <Stack className="navbar-items">
                    <Box className="title">
                        Pixo
                    </Box>
                    <MenuItem className="menu-item" onClick={() => navigateHandler("/")}>
                        <Stack className={routerPath === "/" ? "on menu-select" : "menu-select"}>
                            <Box><House className={"menu-icon"} /></Box>
                            <Box>Home</Box>
                        </Stack>
                    </MenuItem>
                    <MenuItem className="menu-item" onClick={() => navigateHandler("/posts")}>
                        <Stack className={routerPath === "/posts" ? "on menu-select" : "menu-select"}>
                            <Box><Search className="menu-icon" /></Box>
                            <Box>Search</Box>
                        </Stack>
                    </MenuItem>
                    <MenuItem className="menu-item" >
                        <Stack className={"menu-select"}>
                            <Box><CameraPlus className="menu-icon" /></Box>
                            <Box>Create</Box>
                        </Stack>
                    </MenuItem>
                    <MenuItem className="menu-item" onClick={() => navigateHandler("/memberpage")}>
                        <Stack className={routerPath === "/memberpage" ? "on menu-select" : "menu-select"}>
                            <Box><Avatar className="menu-icon" /></Box>
                            <Box>Profile</Box>
                        </Stack>
                    </MenuItem>
                </Stack>
                <MenuItem className="menu-item">
                    <Stack className={"menu-select"}>
                        <Box><Menu className="menu-icon" /></Box>
                        <Box>More</Box>
                    </Stack>
                </MenuItem>
            </Stack>
        )
    }
}

export default Navbar