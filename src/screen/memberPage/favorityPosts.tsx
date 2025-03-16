import { Box, Pagination, Stack } from "@mui/material"
import { Post, Posts, PostsInquiry } from "../../libs/types/post"
import PostService from "../../service api/Post.service"
import { useEffect, useState } from "react"
import { sweetErrorHandling } from "../../libs/sweetAlert"
import { Message } from "../../libs/Message"
import CommentService from "../../service api/Comment.service"
import PostCard from "../../components/others/postCard"
import { ReportGmailerrorredOutlined } from "@mui/icons-material"
import Comments from "../../components/others/comments"
import { useParams } from "react-router-dom"
import { Comment } from "../../libs/types/comment"

const FavorityPosts = () => {
    const member = localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member") as string) : null
    const router = useParams<{ id: string }>()
    const [rebuildPost, setRebuildPost] = useState(new Date())
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPost, setTotalPost] = useState<number>(0)
    const [comments, setComments] = useState<Comment[]>([])
    const [targetPost, setTargetPost] = useState<Post | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [rebuildComments, setRebuildComments] = useState<Date>(new Date())
    const [searchObj, setSearchObj] = useState<PostsInquiry>({
        page: 1,
        limit: 9,
        order: "createdAt",
        direction: -1,
        search: {}
    })

    useEffect(() => {
        const postService = new PostService()
        postService.getFavorityPosts(searchObj).then((posts: Posts) => {
            setPosts(posts.list)
            setTotalPost(posts.metaCounter[0]?.total ?? 0)
        }).catch((err: any) => {
            sweetErrorHandling(err).then()
        })
    }, [searchObj, router, rebuildPost])

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

    const likeTargetPostHandler = async (postId: string) => {
        try {
            if (!member?._id) throw new Error(Message.AUTHENTICATE_FIRST);
            const postService = new PostService()
            await postService.likeTargetPost(postId)
            setRebuildComments(new Date())
            setRebuildPost(new Date())
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
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
        <Stack>
            <Stack className="posts">
                {
                    posts.length > 0 ? posts.map((post: Post, index: number) => (
                        <PostCard
                            post={post}
                            toggleCommentModal={toggleCommentModal}
                            key={index}
                            likeTargetPostHandler={likeTargetPostHandler}
                        />
                    )) : (
                        <Stack className="empty-post">
                            <ReportGmailerrorredOutlined />
                            <Box>There is no post!</Box>
                        </Stack>
                    )
                }
            </Stack>
            <Comments
                likeTargetPostHandler={likeTargetPostHandler}
                openComment={openModal}
                toggleCommentModal={openCommentModal}
                targetPost={targetPost}
                comments={comments}
                setRebuildComments={setRebuildComments}
            />
            {
                posts.length !== 0 ? (
                    <Pagination
                        className="pagination"
                        count={Math.ceil(totalPost / searchObj.limit)}
                        page={searchObj.page}
                        onChange={(e: any, page: number) => {
                            searchObj.page = page
                            setSearchObj({ ...searchObj })
                        }}
                        color="secondary"
                        variant="outlined"
                        shape="rounded"
                    />
                ) : null
            }
        </Stack>
    )
}

export default FavorityPosts