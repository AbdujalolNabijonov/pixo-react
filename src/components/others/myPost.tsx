import { Avatar, Box, IconButton, Menu, Stack, ToggleButton } from "@mui/material"
import { Post } from "../../libs/types/post"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { useNavigate } from "react-router-dom"
import { Trash } from "@phosphor-icons/react"
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert"
import PostService from "../../service api/Post.service"

interface PostCardProps {
    post: Post;
    toggleCommentModal: any
    likeTargetPostHandler: any
}

const MyPost = (props: PostCardProps) => {
    const { post, toggleCommentModal } = props
    const navigate = useNavigate()
    const deleteTargetPostHandler = async (postId: string) => {
        try {
            const confirm = await sweetConfirmAlert("Are you sure to delete it?")
            if (confirm) {
                const postService = new PostService()
                await postService.deleteTargetPost(postId)
                await sweetTopSmallSuccessAlert("Post Deleted!")
                window.location.reload()
            }
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
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
                <ToggleButton className="menu-btn" value={"left"} onClick={() => deleteTargetPostHandler(post._id)}>
                    <Trash />
                </ToggleButton>
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

export default MyPost