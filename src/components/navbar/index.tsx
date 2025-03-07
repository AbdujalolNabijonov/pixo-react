import React, { useState } from "react"
import { Avatar, Box, MenuItem, Stack, Menu as ExtraMenu, Divider } from "@mui/material"
import { Home, HomeOutlined, Menu, RecommendOutlined, Settings, Subscriptions, SubscriptionsOutlined } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { CameraPlus, } from "@phosphor-icons/react"
import CreatePost from "../others/createPost"
import AuthenticationModal from "../others/register"
import useGlobal from "../../libs/hooks/useGlobal"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert"
import MemberService from "../../service api/Member.service"


const Navbar = () => {
    const device: string = "desktop"
    const navigate = useNavigate()
    const routerPath = useLocation().pathname
    const [showExtraMenu, setShowExtraMenu] = useState<boolean>(false)
    const [openRegister, setOpenRegister] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { member } = useGlobal()

    const modalCloseHandler = () => {
        setShowModal(!showModal)
    }

    const navigateHandler = (path: string) => {
        navigate(path)
    }

    const toggleExtraMenu = (e: any) => {
        setShowExtraMenu(!showExtraMenu)
    }
    const registerToggleHandler = (e: any) => {
        setOpenRegister(!openRegister)
    }
    const logoutRequestHandler = async () => {
        try {
            const memberService = new MemberService();
            await memberService.logout()
            await sweetTopSmallSuccessAlert("Successfully log out", 1000, true)
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
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
                            <Box>
                                {routerPath === "/" ? <Home className={"menu-icon"} /> : <HomeOutlined className={"menu-icon"} />}
                            </Box>
                            <Box>Home</Box>
                        </Stack>
                    </MenuItem>
                    <MenuItem className="menu-item" onClick={() => navigateHandler("/posts")}>
                        <Stack className={routerPath === "/posts" ? "on menu-select" : "menu-select"}>
                            <Box>
                                {routerPath === "/posts" ? <SubscriptionsOutlined className="menu-icon" /> : <Subscriptions className="menu-icon" />}
                            </Box>
                            <Box>Explore</Box>
                        </Stack>
                    </MenuItem>
                    <MenuItem className="menu-item" onClick={modalCloseHandler}>
                        <Stack className={"menu-select"}>
                            <Box><CameraPlus className="menu-icon" /></Box>
                            <Box>Create</Box>
                        </Stack>
                    </MenuItem>
                    {
                        member?._id ? (
                            <MenuItem className="menu-item" onClick={() => navigateHandler("/memberpage")}>
                                <Stack className={routerPath === "/memberpage" ? "on menu-select" : "menu-select"}>
                                    <Box><Avatar src={member?.memberImage ? member.memberImage : "/imgs/default-user.jpg"} className="menu-icon" /></Box>
                                    <Box>Profile</Box>
                                </Stack>
                            </MenuItem>
                        ) : null
                    }
                    <CreatePost showModal={showModal} modalCloseHandler={modalCloseHandler} />
                </Stack>
                <MenuItem className="menu-item" onClick={toggleExtraMenu} >
                    <Stack className={"menu-select"}>
                        <Box><Menu className="menu-icon" /></Box>
                        <Box>More</Box>
                    </Stack>
                    <ExtraMenu
                        className="extra-menu"
                        open={Boolean(showExtraMenu)}
                        onClose={toggleExtraMenu}
                    >
                        <Stack className="menu-items">
                            <MenuItem className="menu-item">
                                <Stack className="menu-item-icon">
                                    <Settings />
                                    <Box>Settings</Box>
                                </Stack>
                            </MenuItem>
                            <MenuItem className="menu-item">
                                <Stack className="menu-item-icon">
                                    <RecommendOutlined />
                                    <Box>Likes</Box>
                                </Stack>
                            </MenuItem>
                            <Divider sx={{ borderColor: 'white' }} />
                            {
                                member?._id ? null : (
                                    <MenuItem className="menu-item" onClick={registerToggleHandler}>
                                        <Stack className="menu-item-icon">
                                            <Box>Register</Box>
                                        </Stack>
                                    </MenuItem>
                                )
                            }
                            {
                                member?._id ? (
                                    <MenuItem className="menu-item" onClick={logoutRequestHandler}>
                                        <Stack className="menu-item-icon">
                                            <Box>Log Out</Box>
                                        </Stack>
                                    </MenuItem>
                                ) : null
                            }
                        </Stack>
                    </ExtraMenu>
                </MenuItem>
                <AuthenticationModal
                    registerToggleHandler={registerToggleHandler}
                    openRegister={openRegister}
                    setOpenRegister={setOpenRegister}
                />
            </Stack >
        )
    }
}

export default Navbar