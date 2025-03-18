import { Box, Pagination, Stack } from "@mui/material"
import { ReportGmailerrorredOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import PostService from "../../service api/Post.service"
import { Post, Posts, PostsInquiry } from "../../libs/types/post"
import { sweetErrorHandling } from "../../libs/sweetAlert"
import useGlobal from "../../libs/hooks/useGlobal"
import CommentService from "../../service api/Comment.service"
import { Comment } from "../../libs/types/comment"
import Comments from "../../components/others/comments"
import PostCard from "../../components/others/postCard"
import { Message } from "../../libs/Message"

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
    const member = localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member") as string) : null
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
    const likeTargetPostHandler = async (postId: string) => {
        try {
            if (!member?._id) throw new Error(Message.AUTHENTICATE_FIRST);
            const postService = new PostService()
            await postService.likeTargetPost(postId)
            setRebuildComments(new Date())

        } catch (err: any) {
            await sweetErrorHandling(err)
        }
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
                <Stack className="post-list-wrapper">
                    <Stack className="post-list">
                        {
                            posts.length === 0 ? (
                                <Stack className="empty-post">
                                    <ReportGmailerrorredOutlined />
                                    <Box>There is no post!</Box>
                                </Stack>
                            ) :
                                posts.map((post: Post, index: number) => (
                                    <PostCard
                                        post={post}
                                        key={index}
                                        toggleCommentModal={toggleCommentModal}
                                        likeTargetPostHandler={likeTargetPostHandler}
                                    />
                                ))}
                        <Comments
                            likeTargetPostHandler={likeTargetPostHandler}
                            openComment={openModal}
                            toggleCommentModal={openCommentModal}
                            targetPost={targetPost}
                            comments={comments}
                            setRebuildComments={setRebuildComments}
                        />
                    </Stack>
                </Stack>
                <Stack>
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
            </Stack>
        </Stack>
    )
}

export default PostPage