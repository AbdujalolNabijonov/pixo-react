import { AddAPhotoOutlined, Send } from "@mui/icons-material"
import { Box, Button, IconButton, Modal, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { Member } from "../../libs/types/member"
import MemberService from "../../service api/Member.service"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert"
import { Message } from "../../libs/Message"
import useGlobal from "../../libs/hooks/useGlobal"
import { validTypes } from "../../libs/config"

interface SettingProps {
    openSetting: boolean
    toggleOpenSetting: any
    setRebuild: any
}

const Setting = (props: SettingProps) => {
    const { member } = useGlobal()
    const { openSetting, toggleOpenSetting, setRebuild } = props;
    const { setMember } = useGlobal()
    const [image, setImage] = useState(member?.memberImage ?? "")
    const [memberInputs, setMemberInputs] = useState({
        memberNick: '',
        memberPhone: "",
        memberDesc: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (memberInputs.memberNick || memberInputs.memberDesc || memberInputs.memberPhone || memberInputs.memberDesc || file) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [memberInputs, file])

    const changeImageHandler = async (e: any) => {
        try {
            const type = e.target.files[0].type
            if (!validTypes.includes(type)) throw new Error(Message.IMAGE_FORMAT)
            setFile(e.target.files[0])
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setImage(imageUrl)
        } catch (err: any) {
            toggleOpenSetting()
            await sweetErrorHandling(err)
        }
    }
    const memberNickHandler = (e: any) => {
        memberInputs.memberNick = e.target.value;
        setMemberInputs({ ...memberInputs })
    }
    const memberPhoneHandler = (e: any) => {
        memberInputs.memberPhone = e.target.value;
        setMemberInputs({ ...memberInputs })
    }
    const memberDescHandler = (e: any) => {
        memberInputs.memberDesc = e.target.value;
        setMemberInputs({ ...memberInputs })
    }
    const submitInfoHandler = async () => {
        try {
            const memberService = new MemberService()
            const formData = new FormData()
            if (memberInputs.memberNick) formData.append("memberNick", memberInputs.memberNick)
            if (memberInputs.memberPhone) formData.append("memberPhone", memberInputs.memberPhone)
            if (memberInputs.memberDesc) formData.append("memberDesc", memberInputs.memberDesc)
            if (file) formData.append("memberImage", file)
            const member = await memberService.updateMember(formData);
            setMember(member)
            toggleOpenSetting()
            await sweetTopSmallSuccessAlert(Message.UPDATED_DATA)
            setRebuild(new Date())
        } catch (err: any) {
            toggleOpenSetting()
            await sweetErrorHandling(err)
        }
    }
    return (
        <Modal
            open={openSetting}
            className="setting-modal"
            onClose={toggleOpenSetting}
        >
            <Stack className="setting-modal-body">
                <Stack className="setting-head">
                    <Box className="member-image">
                        <img src={image ?? "/imgs/default-user.jpg"} alt="members" />
                        <IconButton className="add-photo">
                            <AddAPhotoOutlined />
                            <input type="file" onChange={changeImageHandler} />
                        </IconButton>
                    </Box>
                </Stack>
                <Stack className="setting-body">
                    <Stack className="member-nick-phone">
                        <Stack className="form-input">
                            <label className="input-label">Name</label>
                            <input
                                type="text"
                                placeholder={member?.memberNick}
                                onChange={memberNickHandler}
                            />
                        </Stack>
                        <Stack className="form-input">
                            <label className="input-label">Phone</label>
                            <input
                                type="text"
                                placeholder={member?.memberPhone}
                                onChange={memberPhoneHandler}
                            />
                        </Stack>
                    </Stack>
                    <textarea
                        rows={5}
                        value={member?.memberDesc}
                        onChange={memberDescHandler}
                    ></textarea>
                    <Button
                        className="submit-btn"
                        variant="contained"
                        color="warning"
                        endIcon={<Send />}
                        disabled={disableBtn}
                        onClick={submitInfoHandler}
                    >Submit</Button>
                </Stack>
            </Stack>
        </Modal>
    )
}

export default Setting