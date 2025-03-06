import { Avatar, Box, Divider, Pagination, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import { Favorite, FavoriteOutlined, QuestionAnswerOutlined, ReportGmailerrorredOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import PostService from "../../service api/Post.service"
import { Post, Posts, PostsInquiry } from "../../libs/types/post"
import { sweetErrorHandling } from "../../libs/sweetAlert"
import moment from "moment"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination as SPagination } from "swiper/modules"

const PostPage = () => {
    const [searchObj, setSearchObj] = useState<PostsInquiry>({
        page: 1,
        limit: 9,
        order: "createdAt",
        direction: -1,
        search: {}
    })
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPost, setTotalPost] = useState<number>(0)

    useEffect(() => {
        const postService = new PostService()
        postService.getPosts(searchObj).then((posts: Posts) => {
            setPosts(posts.list)
            setTotalPost(posts.metaCounter[0]?.total ?? 0)
        }).catch(err => {
            sweetErrorHandling(err).then()
        })
    }, [searchObj])

    const textSearchHandler = (e: any) => {
        searchObj.search.text = e.target.value;
        setSearchObj({ ...searchObj })
    }
    return (
        <Stack className="post-page">
            <Stack className="container">
                <Stack className="search">
                    <input
                        type="text"
                        placeholder="What post are you looking for?..."
                        onKeyDown={textSearchHandler}
                    />
                </Stack>
                <Stack className="post-list">
                    {
                        posts.length === 0 ? (
                            <Stack className="empty-post">
                                <ReportGmailerrorredOutlined />
                                <Box>There is no post!</Box>
                            </Stack>
                        ) :
                            posts.map((post: Post, index: number) => (
                                <Box className={`explore-item`} key={index}>
                                    <Stack className="explore-head">
                                        <Stack className="member-info">
                                            <Avatar src={post.memberData?.memberImage ? post.memberData?.memberImage : "/imgs/default-user.jpg"} />
                                            <Stack className="info-name">
                                                <Box>{post.memberData?.memberNick}</Box>
                                                <Box>{post.postTitle ?? "post"}</Box>
                                            </Stack>
                                        </Stack>
                                        <Stack className="stats-items">
                                            <Stack className="stats-item">
                                                <FavoriteOutlined />
                                                <Box>12</Box>
                                            </Stack>
                                            <Stack className="stats-item">
                                                <QuestionAnswerOutlined />
                                                <Box>10</Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Swiper
                                        slidesPerView={1}
                                        modules={[SPagination]}
                                        pagination={true}
                                        className="explore-swiper"
                                    >
                                        {
                                            post.postImages.map((image: string, index: number) => (
                                                <SwiperSlide key={index}>
                                                    <img src={image} alt={"post"} />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </Box>
                            ))}
                </Stack>
                {
                    posts.length !== 0 ? (
                        <Pagination
                            className="pagination"
                            count={Math.ceil(totalPost / searchObj.limit)}
                            page={searchObj.page}
                            color="secondary"
                            variant="outlined"
                            shape="rounded"
                        />
                    ) : null
                }
            </Stack>
        </Stack>
    )
}

export default BasicLayout(PostPage)