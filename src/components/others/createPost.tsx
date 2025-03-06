import { Box, Button, Divider, Modal, Stack } from "@mui/material"
import { CssVarsProvider, FormControl, FormLabel, Input, Textarea } from "@mui/joy"
import { FileUploader } from "react-drag-drop-files"
import { useState } from "react"
import { CloudUploadRounded } from "@mui/icons-material"
import { ArrowSquareOut } from "@phosphor-icons/react"

const CreatePost = (props: any) => {
    const { modalCloseHandler, showModal } = props
    const [file, setFile] = useState()
    const [imageUrl, setImageUrl] = useState<string>("")
    const fileTypes = ["JPG", "PNG", "JPEG"]

    const handleChange = (file: any) => {
        setFile(file)
        setImageUrl(URL.createObjectURL(file))
    }
    return (
        <Stack>
            <Modal
                onClose={modalCloseHandler}
                open={showModal}
                className="create-post"
            >
                <Stack className="create-box">
                    <Box className="title">Create Post</Box>
                    <Divider sx={{ borderColor: "white" }} />
                    <CssVarsProvider>
                        <FormControl>
                            <FormLabel className="post-label">Post Title</FormLabel>
                            <Input placeholder="Insert title" />
                        </FormControl>
                        <FormControl>
                            <FormLabel className="post-label">Content</FormLabel>
                            <Textarea minRows={5} placeholder="add content..." />
                        </FormControl>
                    </CssVarsProvider>
                    <Stack className="image-upload">
                        <Box className="pre-view">
                            <img src={imageUrl ? imageUrl : "/imgs/tree.jpeg"} alt="" />
                        </Box>
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            classes="file-drop"
                        >
                            <CloudUploadRounded />
                            <Box>Drag and Drop images here</Box>
                            <Button endIcon={<ArrowSquareOut size={20} />}>
                                Browse File
                            </Button>
                        </FileUploader>
                    </Stack>
                    <Button variant="contained" color="warning">Create</Button>
                </Stack>
            </Modal>
        </Stack>
    )
}

export default CreatePost