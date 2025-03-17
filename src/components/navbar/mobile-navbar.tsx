import React, { useState } from 'react';
import { Avatar, Box, Button, Drawer, Menu, MenuItem, Modal, Stack } from '@mui/material';
import { ChatOutlined, Home, HomeOutlined, Search, SearchOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { CameraPlus, ChatsCircle, MoonStars, SignIn, SignOut } from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticationModal from "../others/register"
import useGlobal from '../../libs/hooks/useGlobal';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import MemberService from '../../service api/Member.service';
import CreatePost from '../others/createPost';
import ChatMenu from '../../screen/homePage/chat';

export default function MobileNavbar() {
    const router = useLocation()
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openRegister, setOpenRegister] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openChat, setOpenChat] = useState(false)
    const { member } = useGlobal()

    const toggleChat = () => {
        setOpenChat(!openChat)
    }
    const gotoHandler = (path: string) => {
        navigate(path)
    }
    const toggleMenuHandler = (e: any) => {
        setOpenMenu(!openMenu)
        setAnchorEl(e.target)
    }
    const registerToggleHandler = () => {
        setOpenRegister(!openRegister)
    }
    const modalCloseHandler = () => {
        setOpenModal(!openModal)
    }
    const logoutHandler = async () => {
        try {
            const memberService = new MemberService()
            await memberService.logout()
            setOpenMenu(false)
            await sweetTopSmallSuccessAlert("Logged out", 1000, true)
        } catch (err: any) {
            setOpenMenu(false)
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className='mobile-nav'>
            <Button className='nav-item' onClick={() => gotoHandler("/")}>
                {
                    router.pathname === "/" ? (
                        <Home />
                    ) : (
                        <HomeOutlined />
                    )
                }
            </Button>
            <Button className='nav-item' onClick={() => gotoHandler("/posts")}>
                {
                    router.pathname === "/posts" ? (
                        <Search />
                    ) : (
                        <SearchOutlined />
                    )
                }
            </Button>
            <Button className='nav-item' onClick={modalCloseHandler}>
                <CameraPlus />
            </Button>
            <Button className='nav-item' onClick={toggleChat}>
                <ChatsCircle />
            </Button>
            {
                member?._id ? (
                    <Button className='nav-item'
                        onClick={(e: any) => {
                            toggleMenuHandler(e)
                        }}
                    >
                        <Avatar src={member.memberImage ? member.memberImage : "/imgs/default-user.jpg"} />
                        <Menu
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={toggleMenuHandler}
                            className='mobile-nav-menu'
                        >
                            <MenuItem className='menu-item' onClick={() => gotoHandler("/my-page")}>
                                <Stack className='menu-item-stack'>
                                    <Avatar src={member.memberImage ? member.memberImage : "/imgs/default-user.jpg"} />
                                    <Box>My Profile</Box>
                                </Stack>
                            </MenuItem>
                            <MenuItem className='menu-item'>
                                <Stack className='menu-item-stack'>
                                    <ThumbUpAltOutlined />
                                    <Box>Likes</Box>
                                </Stack>
                            </MenuItem>
                            <MenuItem onClick={logoutHandler} className='menu-item'>
                                <Stack className='menu-item-stack'>
                                    <SignOut />
                                    <Box>Log Out</Box>
                                </Stack>
                            </MenuItem>
                        </Menu>
                    </Button>
                ) : (
                    <Button className='nav-item' onClick={registerToggleHandler}>
                        <SignIn />
                    </Button>
                )
            }
            <AuthenticationModal
                registerToggleHandler={registerToggleHandler}
                openRegister={openRegister}
                setOpenRegister={setOpenRegister}
            />
            <Modal
                open={openChat}
                onClose={toggleChat}
                className='mobile-wrapper-chat'
            >
                <ChatMenu />
            </Modal>
            <CreatePost showModal={openModal} modalCloseHandler={modalCloseHandler} />
        </Stack>
    );
}