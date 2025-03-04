import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

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
                    Array.from({ length: 10 }).map((key, index: number) => (
                        <SwiperSlide className="member" key={index}>
                            <Box className="member-image">
                                <Box className="image-wrapper">
                                    <img src="/imgs/man.jpg" alt="" />
                                </Box>
                            </Box>
                            <Box className="member-name">
                                Martin
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Stack>
    )
}
export default Members