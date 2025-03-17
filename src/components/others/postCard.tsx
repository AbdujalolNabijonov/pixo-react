import { Avatar, Box, Stack } from "@mui/material"
import { Post } from "../../libs/types/post"
import { FavoriteOutlined, QuestionAnswerOutlined } from "@mui/icons-material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { useNavigate } from "react-router-dom"

interface PostCardProps {
    post: Post;
    toggleCommentModal: any
    likeTargetPostHandler: any
}

const PostCard = (props: PostCardProps) => {
    const { post, toggleCommentModal, likeTargetPostHandler } = props
    const navigate = useNavigate()
    return (
        <Box className={`explore-item`} key={"1"}>
            <Stack className="explore-head">
                <Stack className="member-info">
                    <Avatar src={post.memberData?.memberImage ? post.memberData?.memberImage : "/imgs/default-user.jpg"} />
                    <Stack className="info-name">
                        <Box
                            onClick={() => {
                                navigate(`/memberpage/${post.memberData?._id}`)
                            }}
                        >{post.memberData?.memberNick}</Box>
                        <Box>{post.postTitle ?? "post"}</Box>
                    </Stack>
                </Stack>
                <Stack className="stats-items">
                    <Stack className="stats-item">
                        <FavoriteOutlined
                            sx={post.meLiked[0]?.meLiked ? { fill: "red" } : { fill: "white" }}
                            onClick={() => likeTargetPostHandler(post._id)}
                        />
                        <Box>{post.postLikes}</Box>
                    </Stack>
                    <Stack className="stats-item">
                        <QuestionAnswerOutlined />
                        <Box>{post.postComments}</Box>
                    </Stack>
                </Stack>
            </Stack>
            <Swiper
                slidesPerView={1}
                modules={[Pagination]}
                pagination={true}
                className="explore-swiper"
            >
                {
                    post.postImages.map((image: string, index: number) => (
                        <SwiperSlide key={index} onClick={() => toggleCommentModal(post._id)}>
                            <img src={image} alt={"post"} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )
}

export default PostCard