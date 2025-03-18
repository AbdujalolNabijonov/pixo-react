import { Box, IconButton, Stack } from "@mui/material"
import { FavoriteOutlined, QuestionAnswerOutlined, Settings } from "@mui/icons-material"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setting from "./setting";
import MyPosts from "./myPosts";
import FavorityPosts from "./favorityPosts";

const MemberPage = () => {
    const [value, setValue] = useState("1")
    const member = localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member") as string) : null
    const [openSetting, setOpenSetting] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!member) {
            navigate("/")
        }
    })

    useEffect(() => {
        if (localStorage.getItem("value")) {
            setValue(String(JSON.parse(localStorage.getItem("value") as string)))
        }
        return () => {
            localStorage.removeItem("value")
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const changeTabValueHandler = (e: any, index: any) => {
        setValue(index)
    }
    const toggleOpenSetting = () => {
        setOpenSetting(!openSetting)
    }
    return (
        <Stack className="member-page">
            <Stack className="container">
                <Stack className="member-data">
                    <Box className="member-image">
                        <img src={member.memberImage ?? "/imgs/default-user.jpg"} alt="member-image" />
                    </Box>
                    <Stack className="member-info">
                        <Box className="member-name">{member?.memberNick}</Box>
                        <Box className="member-desc">{member?.memberDesc ?? "No-desc"}</Box>
                        <Stack className="member-stats">
                            <Stack className="member-stats-item">
                                <QuestionAnswerOutlined />
                                <Box>{member?.memberPosts}</Box>
                            </Stack>
                            <Stack className="member-stats-item">
                                <FavoriteOutlined />
                                <Box>{member?.memberLikes ?? 0}</Box>
                            </Stack>
                        </Stack>
                        <IconButton className="setting" onClick={toggleOpenSetting}>
                            <Settings />
                        </IconButton>
                    </Stack>
                </Stack>
                <TabContext value={value}>
                    <Stack className="tab-list">
                        <TabList aria-label="lab API tabs example" onChange={changeTabValueHandler}>
                            <Tab className="tab-item" label="Posts" value="1" />
                            <Tab className="tab-item" label="Favorities" value="2" />
                        </TabList>
                    </Stack>
                    <Setting openSetting={openSetting} toggleOpenSetting={toggleOpenSetting} />
                    <TabPanel value={"1"} className="post-list">
                        <MyPosts />
                    </TabPanel>
                    <TabPanel value={"2"} className="post-list">
                        <FavorityPosts />
                    </TabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default MemberPage