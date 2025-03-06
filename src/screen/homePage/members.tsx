import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { Member } from "../../libs/types/member"
import { serverApi } from "../../libs/config"

const Members = (props: any) => {
    return (
        <Stack className="members">
            <Swiper
                className="swiper"
                slidesPerView={6}
                modules={[Navigation]}
                navigation={true}
            >
                {
                    props.members.map((member: Member, index: number) => {
                        const imageUrl = member.memberImage ? `${member.memberImage}` : "/imgs/default-user.jpg"
                        return (
                            <SwiperSlide className="member" key={index}>
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