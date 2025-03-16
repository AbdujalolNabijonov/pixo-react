import { Box, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import { Favorite, QuestionAnswerOutlined, RemoveRedEyeOutlined, Settings } from "@mui/icons-material"
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import { sweetErrorHandling } from "../../libs/sweetAlert";
import { useNavigate, useParams } from "react-router-dom";
import { Member } from "../../libs/types/member";
import MemberService from "../../service api/Member.service";
import MyPosts from "./myPosts";
import useGlobal from "../../libs/hooks/useGlobal";

const MemberPage = () => {
    const [targetMember, setTargetMember] = useState<Member | null>(null)
    const router = useParams<{ id: string }>()
    const {member}=useGlobal()
    const navigate = useNavigate()

    useEffect(()=>{
        if(member?._id===router.id){
            navigate("/my-page")
        }
    },[])
    
    useEffect(() => {
        if (router.id) {
            const memberService = new MemberService()
            memberService.getMember(router.id).then((member: Member) => {
                setTargetMember(member)
            }).catch((err: any) => {
                sweetErrorHandling(err).then()
            })
        }
    }, [router])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Stack className="member-page">
            <Stack className="container">
                <Stack className="member-data">
                    <Box className="member-image">
                        <img src={targetMember?.memberImage ? targetMember.memberImage : "/imgs/default-user.jpg"} alt="member-image" />
                    </Box>
                    <Stack className="member-info">
                        <Box className="member-name">{targetMember?.memberNick}</Box>
                        <Box className="member-desc">{targetMember?.memberDesc ?? "No-desc"}</Box>
                        <Stack className="member-stats">
                            <Stack className="member-stats-item">
                                <QuestionAnswerOutlined />
                                <Box>{targetMember?.memberPosts}</Box>
                            </Stack>
                            <Stack className="member-stats-item">
                                <Favorite />
                                <Box>10</Box>
                            </Stack>
                            <Stack className="member-stats-item">
                                <RemoveRedEyeOutlined />
                                <Box>12</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <TabContext value={"1"}>
                    <TabPanel value={"1"} className="post-list">
                        <MyPosts />
                    </TabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default BasicLayout(MemberPage)