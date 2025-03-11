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
import useGlobal from "../../libs/hooks/useGlobal"
import CommentService from "../../service api/Comment.service"
import { Comment } from "../../libs/types/comment"
import Comments from "../../components/others/comments"

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
    const { rebuild } = useGlobal()
    const [comments, setComments] = useState<Comment[]>([])
    const [targetPost, setTargetPost] = useState<Post | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [rebuildComments, setRebuildComments] = useState(new Date())
    useEffect(() => {
        const postService = new PostService()
        postService.getPosts(searchObj).then((posts: Posts) => {
            setPosts(posts.list)
            setTotalPost(posts.metaCounter[0]?.total ?? 0)
        }).catch(err => {
            sweetErrorHandling(err).then()
        })
    }, [searchObj, rebuild, rebuildComments])

    useEffect(() => {
        if (targetPost?._id) {
            const commentService = new CommentService()
            commentService.getComments(targetPost._id).then(data => {
                setComments(data.list)
            }).catch((err: any) => {
                sweetErrorHandling(err).then()
            });
            const postService = new PostService();
            postService.getPost(targetPost._id).then((post: Post) => {
                setTargetPost(post)
            }).catch(err => {
                sweetErrorHandling(err).then()
            })
        }
    }, [rebuildComments])
    const textSearchHandler = (e: any) => {
        searchObj.search.text = e.target.value;
        setSearchObj({ ...searchObj })
    }
    const toggleCommentModal = async (postId: string) => {
        try {
            const postService = new PostService()
            const commentService = new CommentService()
            const result = await postService.getPost(postId)
            const comments = await commentService.getComments(postId);
            setComments(comments.list)
            setTargetPost(result)
            setOpenModal(true)
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    const openCommentModal = () => {
        setOpenModal(false)
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
                                        modules={[SPagination]}
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
                            ))}
                    <Comments
                        openComment={openModal}
                        toggleCommentModal={openCommentModal}
                        targetPost={targetPost}
                        comments={comments}
                        setRebuildComments={setRebuildComments}
                    />
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