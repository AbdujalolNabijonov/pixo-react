import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { Member, Members as MemberList } from "../../libs/types/member"
import { useEffect, useState } from "react"
import MemberService from "../../service api/Member.service"
import { sweetErrorHandling } from "../../libs/sweetAlert"
import { useNavigate } from "react-router-dom"

const Members = (props: any) => {
    const [members, setMembers] = useState<Member[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        const memberService = new MemberService()
        memberService.getMembers().then((members: MemberList) => {
            setMembers(members.list)
        }).catch(err => {
            sweetErrorHandling(err).then()
        })
    }, [])
    return (
        <Stack className="members">
            <Swiper
                className="swiper"
                slidesPerView={6}
                modules={[Navigation]}
                navigation={true}
            >
                {
                    members.map((member: Member, index: number) => {
                        const imageUrl = member.memberImage ? `${member.memberImage}` : "/imgs/default-user.jpg"
                        return (
                            <SwiperSlide 
                            className="member" 
                            key={index}
                            onClick={()=>{
                                navigate(`/memberpage/${member._id}`)
                            }}
                            >
                                <Box className="member-image">
                                    <Box className="image-wrapper">
                                        <img src={imageUrl} alt={member.memberNick} />
                                    </Box>
                                </Box>
                                <Box className="member-name">
                                    {member.memberNick}
                                </Box>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Stack>
    )
}
export default Members