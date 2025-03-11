import { Box, Pagination, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import { Favorite, QuestionAnswerOutlined, RemoveRedEyeOutlined, ReportGmailerrorredOutlined } from "@mui/icons-material"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import useGlobal from "../../libs/hooks/useGlobal";
import { Post, Posts, PostsInquiry } from "../../libs/types/post";
import PostService from "../../service api/Post.service";
import { sweetErrorHandling } from "../../libs/sweetAlert";
import PostCard from "../../components/others/postCard";
import Comments from "../../components/others/comments";
import CommentService from "../../service api/Comment.service";
import { Comment } from "../../libs/types/comment";
import { useParams } from "react-router-dom";
import { Member } from "../../libs/types/member";
import MemberService from "../../service api/Member.service";

const MemberPage = () => {
    const [value, setValue] = useState("1")
    const member = JSON.parse(localStorage.getItem("member") as string)
    const [targetMember, setTargetMember] = useState<Member | null>(member)
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPost, setTotalPost] = useState<number>(0)
    const [comments, setComments] = useState<Comment[]>([])
    const [targetPost, setTargetPost] = useState<Post | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [rebuildComments, setRebuildComments] = useState<Date>(new Date())
    const router = useParams<{ id: string }>()
    const [searchObj, setSearchObj] = useState<PostsInquiry>({
        page: 1,
        limit: 9,
        order: "createdAt",
        direction: -1,
        search: {
            memberId: router.id ? router.id : member._id
        }
    })

    useEffect(() => {
        const postService = new PostService()
        postService.getPosts(searchObj).then((posts: Posts) => {
            setPosts(posts.list)
            setTotalPost(posts.metaCounter[0]?.total ?? 0)
        }).catch(err => {
            sweetErrorHandling(err).then()
        })
    }, [searchObj])

    useEffect(() => {
        if (router.id || member._id) {
            const memberService = new MemberService()
            memberService.getMember(router.id ? router.id : member._id).then((member: Member) => {
                setTargetMember(member)
            }).catch((err: any) => {
                sweetErrorHandling(err).then()
            })
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
    const changeTabValueHandler = (e: any, index: any) => {
        setValue(index)
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
        <Stack className="member-page">
            <Stack className="container">
                <Stack className="member-data">
                    <Box className="member-image">
                        <img src={targetMember?.memberImage ? targetMember.memberImage : "/imgs/default-user.jpg"} alt="member-image" />
                    </Box>
                    <Stack className="member-info">
                        <Box className="member-name">{targetMember?.memberNick}</Box>
                        <Box className="member-desc">{targetMember?.memberDesc ?? "No-desc"}</Box>
                        <Stack className="member-stats">
                            <Stack className="member-stats-item">
                                <QuestionAnswerOutlined />
                                <Box>{targetMember?.memberPosts}</Box>
                            </Stack>
                            <Stack className="member-stats-item">
                                <Favorite />
                                <Box>10</Box>
                            </Stack>
                            <Stack className="member-stats-item">
                                <RemoveRedEyeOutlined />
                                <Box>12</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <TabContext value={value}>
                    <Stack className="tab-list">
                        <TabList aria-label="lab API tabs example" onChange={changeTabValueHandler}>
                            <Tab className="tab-item" label="My Posts" value="1" />
                            <Tab className="tab-item" label="Favorities" value="2" />
                        </TabList>
                    </Stack>
                    <TabPanel value={"1"} className="post-list">
                        <Stack className="posts">
                            {
                                posts.length > 0 ? posts.map((post: Post, index: number) => (
                                    <PostCard post={post} toggleCommentModal={toggleCommentModal} />
                                )) : (
                                    <Stack className="empty-post">
                                        <ReportGmailerrorredOutlined />
                                        <Box>There is no post!</Box>
                                    </Stack>
                                )
                            }
                        </Stack>
                        <Comments
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
                    </TabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default BasicLayout(MemberPage)