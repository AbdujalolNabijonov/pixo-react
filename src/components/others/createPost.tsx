import { Box, Button, Divider, Modal, Stack } from "@mui/material"
import { CssVarsProvider, FormControl, FormLabel, Input, Textarea } from "@mui/joy"
import { FileUploader } from "react-drag-drop-files"
import { useState } from "react"
import { CloudUploadRounded } from "@mui/icons-material"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert"
import { Message } from "../../libs/Message"
import PostService from "../../service api/Post.service"
import useGlobal from "../../libs/hooks/useGlobal"
import useDeviceDetect from "../../libs/hooks/useDeviceDetect"
import { useNavigate } from "react-router-dom"


const CreatePost = (props: any) => {
    const { modalCloseHandler, showModal } = props
    const [files, setFiles] = useState<any[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const fileTypes = ["JPG", "PNG", "JPEG"]
    const [postTitle, setPostTitle] = useState("")
    const [postContent, setPostContent] = useState("")
    const { member, setRebuild } = useGlobal()
    const [disableBtn, setDisableBtn] = useState(false)
    const device = useDeviceDetect()
    const navigate = useNavigate()


    const createRequestHandler = async () => {
        try {
            if (!member?._id) throw new Error(Message.AUTHENTICATE_FIRST)
            setDisableBtn(true)
            if (files.length < 1) throw new Error(Message.IMAGE_LIMIT)
            const postService = new PostService()
            const formData = new FormData();
            if (postTitle) formData.append("postTitle", postTitle)
            if (postContent) formData.append("postContent", postContent)
            files.forEach((file) => {
                formData.append("postImages", file);
            });
            await postService.createPost(formData);
            setFiles([])
            setPostTitle("")
            setPostContent("")
            setImageUrls([])
            modalCloseHandler()
            await sweetTopSmallSuccessAlert(Message.POST_CREATED)
            setRebuild(new Date())
            navigate("/posts")
        } catch (err: any) {
            modalCloseHandler()
            await sweetErrorHandling(err)
        }
    }

    const handleChange = async (files: any) => {
        try {
            const filesArray = Object.values(files)
            if (filesArray.length > 5 || filesArray.length < 1) throw new Error(Message.IMAGE_LIMIT)
            setFiles(filesArray)
            setImageUrls(filesArray.map((file: any) => URL.createObjectURL(file)))
        } catch (err: any) {
            modalCloseHandler()
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack>
            <Modal
                onClose={modalCloseHandler}
                open={showModal}
                className={device === "mobile" ? "create-post-mobile" : "create-post-pc"}
            >
                <Stack className={"create-box"}>
                    <Box className="title">Create Post</Box>
                    <Divider sx={{ borderColor: "white" }} />
                    <CssVarsProvider>
                        <FormControl>
                            <FormLabel className="post-label">Post Title</FormLabel>
                            <Input placeholder="Insert title" onChange={(e: any) => setPostTitle(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel className="post-label">Content</FormLabel>
                            <Textarea minRows={5} placeholder="add content..." onChange={(e: any) => setPostContent(e.target.value)} />
                        </FormControl>
                    </CssVarsProvider>
                    <Stack className="image-upload">
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            classes="file-drop"
                            multiple={true}
                        >
                            <CloudUploadRounded />
                            <Box>Drag and Drop images here</Box>
                            <Button endIcon={<ArrowSquareOut size={20} />}>
                                Browse File
                            </Button>
                        </FileUploader>
                    </Stack>
                    <Stack className="pre-images">
                        {
                            imageUrls.map((image: string) => (
                                <Box className="pre-view">
                                    <img src={image} alt="" />
                                </Box>
                            ))
                        }
                    </Stack>
                    <Button variant="contained" color="warning" onClick={createRequestHandler} disabled={disableBtn}>Create</Button>
                </Stack>
            </Modal>
        </Stack>
    )
}

export default CreatePost;