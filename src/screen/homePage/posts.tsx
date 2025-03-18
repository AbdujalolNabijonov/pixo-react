import { FavoriteOutlined, QuestionAnswerOutlined, ReportGmailerrorredOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, CircularProgress, Pagination, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { Post, Posts as PostList, PostsInquiry } from "../../libs/types/post"
import PostService from "../../service api/Post.service"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination as SPagination } from "swiper/modules"
import moment from "moment"
import useGlobal from "../../libs/hooks/useGlobal"
import Comments from "../../components/others/comments"
import { Comment } from "../../libs/types/comment"
import CommentService from "../../service api/Comment.service"
import { Message } from "../../libs/Message"
import { useNavigate } from "react-router-dom"

const Posts = (props: any) => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPost, setTotalPost] = useState<number>(0)
    const [opeenModal, setOpenModal] = useState<boolean>(false)
    const [targetPost, setTargetPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [commentContent, setCommentContent] = useState("")
    const [rebuildComments, setRebuildComments] = useState(new Date())
    const [searchObj, setSearchObj] = useState<PostsInquiry>({
        page: 1,
        limit: 10,
        order: 'createdAt',
        direction: -1,
        search: {}
    })
    const { rebuild, member, setRebuild } = useGlobal()
    const [loading, setLoading] = useState(true)
    const [rebuildPosts, setRebuildPosts] = useState(new Date())

    useEffect(() => {
        const postService = new PostService();
        postService.getPosts(searchObj).then((posts: PostList) => {
            setPosts(posts.list)
            setTotalPost(posts.metaCounter[0]?.total ?? 0)
        }).catch(err => {
            sweetErrorHandling(err).then()
        }).finally(()=>{
            setLoading(false)
        })
    }, [rebuild, rebuildComments, rebuildPosts])

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

    const paginationHandler = (e: any, page: number) => {
        searchObj.page = page;
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
    const submitCommentRequest = async (postId: string) => {
        try {
            if (!member?._id) throw new Error(Message.AUTHENTICATE_FIRST);
            if (!commentContent) throw new Error(Message.FULL_FILL_INPUTS);
            const commentService = new CommentService()
            await commentService.createComment({ commentContent: commentContent, commentTargetId: postId });
            await sweetTopSmallSuccessAlert("Successfully commented!")
            setRebuild(new Date())
            setCommentContent("")
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }

    const likeTargetPostHandler = async (postId: string) => {
        try {
            if (!member?._id) throw new Error(Message.AUTHENTICATE_FIRST);
            const postService = new PostService()
            await postService.likeTargetPost(postId)
            setRebuildPosts(new Date())
            if (targetPost?._id) {
                setRebuildComments(new Date())
            }
        } catch (err: any) {
            if (opeenModal) {
                setOpenModal(false)
            }
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="posts">
            {
                loading ? (
                    <Stack className="empty-post">
                        <CircularProgress/>
                    </Stack>
                ) : posts.length === 0 ?
                    (
                        <Stack className="empty-post">
                            <ReportGmailerrorredOutlined />
                            <Box>There is no post!</Box>
                        </Stack>
                    ) :
                    posts.map((post: Post, index: number) => {
                        return (
                            <Stack className="post" key={index}>
                                <Stack className="post-head">
                                    <Box className="member-image">
                                        <Avatar src={post.memberData?.memberImage ? post.memberData?.memberImage : "/imgs/default-user.jpg"} className="" />
                                    </Box>
                                    <Stack className="member-name">
                                        <Box onClick={() => {
                                            navigate(`/member/${post.memberData?._id}`)
                                        }}>{post.memberData?.memberNick}</Box>
                                        <Box>{moment(post.createdAt).format("DD MMMM, YYYY")}</Box>
                                    </Stack>
                                </Stack>
                                <Stack className="post-body">
                                    <Swiper
                                        slidesPerView={1}
                                        modules={[SPagination]}
                                        pagination={{ clickable: true }}
                                        className="image-swiper"
                                    >
                                        {post.postImages.map((image: string, index: number) => (
                                            <SwiperSlide className="image-slide" key={index}>
                                                <img src={image} alt="" />
                                            </SwiperSlide>
                                        ))
                                        }
                                    </Swiper>
                                </Stack>
                                <Stack className="post-footer">
                                    <Stack className="post-stats">
                                        <Stack className="post-stats-item">
                                            <Button onClick={() => likeTargetPostHandler(post._id)} className="m-btn">
                                                <FavoriteOutlined
                                                    sx={post.meLiked[0]?.meLiked ? { fill: "red" } : { fill: "white" }}
                                                />
                                            </Button>
                                            <Box>{post.postLikes}</Box>
                                        </Stack>
                                        <Button className="post-stats-item" onClick={() => toggleCommentModal(post._id)}>
                                            <QuestionAnswerOutlined sx={{ color: "white" }} />
                                            <Box>{post.postComments}</Box>
                                        </Button>
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
                                        <input type="text" placeholder="Add a comment..." value={commentContent} onChange={(e: any) => setCommentContent(e.target.value)} />
                                        <Button variant="outlined" color="warning" onClick={() => submitCommentRequest(post._id)}>post</Button>
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
            <Comments
                likeTargetPostHandler={likeTargetPostHandler}
                openComment={opeenModal}
                toggleCommentModal={openCommentModal}
                targetPost={targetPost}
                comments={comments}
                setRebuildComments={setRebuildComments}
            />
        </Stack>
    )
}

export default Posts