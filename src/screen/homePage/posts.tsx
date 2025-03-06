import { DoubleArrowOutlined, ExpandMoreOutlined, Favorite, FavoriteOutlined, QuestionAnswerOutlined, ReportGmailerrorredOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Pagination, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { Post, Posts as PostList, PostsInquiry } from "../../libs/types/post"
import PostService from "../../service api/Post.service"
import { sweetErrorHandling } from "../../libs/sweetAlert"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination as SPagination } from "swiper/modules"
import moment from "moment"

const Posts = (props: any) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPost, setTotalPost] = useState<number>(0)
    const [searchObj, setSearchObj] = useState<PostsInquiry>({
        page: 1,
        limit: 10,
        order: 'createdAt',
        direction: -1,
        search: {}
    })

    useEffect(() => {
        const postService = new PostService();
        postService.getPosts(searchObj).then((posts: PostList) => {
            setPosts(posts.list)
            setTotalPost(posts.metaCounter[0].total)
        }).catch(err => {
            sweetErrorHandling(err).then()
        })
    }, [])

    const paginationHandler = (e: any, page: number) => {
        searchObj.page = page;
        setSearchObj({ ...searchObj })
    }

    return (
        <Stack className="posts">
            {
                posts.length === 0 ?
                    (
                        <Stack className="empty-post">
                            <ReportGmailerrorredOutlined />
                            <Box>There is no post!</Box>
                        </Stack>
                    ) :
                    posts.map((post: Post) => {
                        return (
                            <Stack className="post">
                                <Stack className="post-head">
                                    <Box className="member-image">
                                        <Avatar src={post.memberData?.memberImage ? post.memberData?.memberImage : "/imgs/default-user.jpg"} className="" />
                                    </Box>
                                    <Stack className="member-name">
                                        <Box>{post.memberData?.memberNick}</Box>
                                        <Box>{moment(post.createdAt).format("DD MMMM, YYYY")}</Box>
                                    </Stack>
                                </Stack>
                                <Stack className="post-body">
                                    <Swiper
                                        slidesPerView={1}
                                        modules={[SPagination]}
                                        pagination={true}
                                        className="image-swiper"
                                    >
                                        {post.postImages.map((image: string) => (
                                            <SwiperSlide className="image-slide">
                                                <img src={image} alt="" />
                                            </SwiperSlide>
                                        ))
                                        }
                                    </Swiper>
                                </Stack>
                                <Stack className="post-footer">
                                    <Stack className="post-stats">
                                        <Stack className="post-stats-item">
                                            <FavoriteOutlined />
                                            <Box>{post.postLikes}</Box>
                                        </Stack>
                                        <Stack className="post-stats-item">
                                            <QuestionAnswerOutlined />
                                            <Box>{post.postComments}</Box>
                                        </Stack>
                                    </Stack>
                                    {
                                        post.postTitle ? (
                                            <Stack className="post-title">
                                                <Box>Title:</Box>
                                                <Box>{post.postTitle}</Box>
                                            </Stack>
                                        ) : null
                                    }
                                    {
                                        post.postContent ? (
                                            <Accordion className="post-accor">
                                                <AccordionSummary
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                    className="post-content-icon"
                                                >more</AccordionSummary>
                                                <AccordionDetails className="post-content">{post.postContent}</AccordionDetails>
                                            </Accordion>
                                        ) : null
                                    }
                                    <Stack className="post-input">
                                        <input type="text" placeholder="Add a comment..." />
                                        <Button variant="outlined" color="warning">post</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )
                    })}
            {
                posts.length === 0 ?
                    null :
                    (
                        <Pagination
                            className="pagination"
                            page={searchObj.page}
                            count={Math.ceil(totalPost / searchObj.limit)}
                            onChange={paginationHandler}
                            color="secondary"
                            variant="outlined"
                            shape="rounded"
                        />
                    )
            }
        </Stack>
    )
}

export default Posts