import React, { useCallback, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Modal, Stack, Tooltip } from "@mui/material";
import { GitHub, Google, RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material";
import { Message } from "../../libs/Message";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../libs/sweetAlert";
import MemberService from "../../service api/Member.service";
import { AuthModalProps } from "../../libs/types/props";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../libs/hooks/useGlobal";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";



const AuthenticateModal = (props: AuthModalProps) => {
    //Initilizations
    const device: string = useDeviceDetect()
    const { setOpenRegister, registerToggleHandler, openRegister } = props
    const [signupObj, setSignupObj] = useState({ memberNick: '', memberPhone: '', memberPassword: '', })
    const [loginObj, setLoginObj] = useState({ memberNick: '', memberPassword: '' });
    const [signIn, toggle] = React.useState(true);
    const [checkPassword, setCheckPassword] = React.useState("");
    const [hidden, setHidden] = useState<boolean>(true)
    const [inputType, setInputType] = useState<string>("password")
    const { member, setMember } = useGlobal()

    //Handlers
    const handleSignUpRequest = async () => {
        try {
            if (
                signupObj.memberNick === "" ||
                signupObj.memberPassword === "" ||
                signupObj.memberPhone === "" ||
                checkPassword === ""
            ) {
                throw new Error(Message.FULL_FILL_INPUTS);
            }
            if (signupObj.memberPassword !== checkPassword) {
                throw new Error(Message.PASSWORD_NOT_MATCH)
            }
            const memberService = new MemberService()
            const member = await memberService.signupRequest(signupObj)
            setMember(member)
            setOpenRegister(false)
            await sweetTopSmallSuccessAlert(Message.SUCCESS_AUTH, 1000, true)
        } catch (err: any) {
            setOpenRegister(false)
            await sweetErrorHandling(err)
        }
    }
    const handleLogInRequest = async () => {
        try {
            if (loginObj.memberNick === "" || loginObj.memberPassword === "") {
                throw new Error(Message.FULL_FILL_INPUTS)
            }
            const memberService = new MemberService()
            const member = await memberService.loginRequest(loginObj);
            setMember(member)
            setOpenRegister(false)
            await sweetTopSmallSuccessAlert(Message.SUCCESS_AUTH, 1000, true)
        } catch (err: any) {
            setOpenRegister(false)
            await sweetErrorHandling(err)
        }
    }
    const handleKeyDownSignUp = (e: any) => {
        if (e.key == "Enter") {
            handleSignUpRequest()
        }
    }
    const handleKeyDownLogIn = (e: any) => {
        if (e.key == "Enter") {
            handleLogInRequest()
        }
    }
    const validatePhoneNumber = (e: any) => {
        let value = e.target.value.replace(/\D/g, "");
        setSignupObj(prev => ({ ...prev, memberPhone: value }));
    }

    const handleHiddenPassword = (cond: boolean) => {
        if (cond) {
            setInputType("password")
        } else {
            setInputType("text")
        }
        setHidden(!hidden)
    }
    return (
        <Modal
            open={openRegister}
            onClose={registerToggleHandler}
            className={device === "mobile" ? "auth-modal-mobile" : "auth-modal-pc"}
        >
            <Stack className="join-auth">
                <Stack className="authMain" >
                    <Box className="auth_container">
                        <Box className={"auth_signUp"} style={signIn ? {} : { transform: "translateX(100%)", opacity: "1", zIndex: "5" }}>
                            <Box className={"signUp_body"}>
                                <Box className="login_title">Create Account</Box>
                                <input
                                    type="text"
                                    id="floatingUser"
                                    placeholder="User Name"
                                    onChange={(e) => { setSignupObj({ ...signupObj, memberNick: e.target.value }) }}
                                />
                                <input
                                    type="text"
                                    maxLength={11}
                                    id="floatingphone"
                                    placeholder="Phone Number"
                                    onChange={validatePhoneNumber}
                                    value={signupObj.memberPhone}
                                />
                                <input
                                    type="type"
                                    id="floatingpassword"
                                    placeholder="Password"
                                    onChange={(e) => { setSignupObj({ ...signupObj, memberPassword: e.target.value }) }}
                                />
                                <input
                                    type="type"
                                    className="form-control"
                                    id="floatingre"
                                    placeholder="Re-enter Password"
                                    onKeyDown={handleKeyDownSignUp}
                                    onChange={(e) => { setCheckPassword(e.target.value) }}
                                />
                                <Stack className="auth-ways">
                                    <Tooltip title="GitHub" placement="left">
                                        <Button className="auth-icon">
                                            <GitHub />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Google" placement="right">
                                        <Button className="auth-icon">
                                            <Google />
                                        </Button>
                                    </Tooltip>
                                </Stack>
                                <Button
                                    className={"login-btn"}
                                    onClick={handleSignUpRequest}
                                    onKeyDown={handleKeyDownSignUp}
                                >
                                    Sign Up
                                </Button>
                                {
                                    device === "mobile" ? (
                                        <Box sx={{ marginTop: "10px" }} onClick={() => toggle(true)}>
                                            I'm already a member
                                        </Box>
                                    ) : null
                                }
                            </Box>
                        </Box>
                        <Box className={"auth_logIn"}>
                            <Box className={"logIn_body"} style={signIn ? {} : { transform: "translateX(100%)", display: "none" }}>
                                <div className="title">Sign in</div>
                                <input
                                    type="text"
                                    id="floatinguser"
                                    placeholder="User Name"
                                    onChange={(e) => setLoginObj({ ...loginObj, memberNick: e.target.value })}
                                />
                                <Stack className="form-floating">
                                    <input
                                        type={inputType}
                                        id="floatingpassord"
                                        placeholder="Password"
                                        onKeyDown={handleKeyDownLogIn}
                                        onChange={(e) => setLoginObj({ ...loginObj, memberPassword: e.target.value })}
                                    />
                                    <IconButton
                                        className="password-visible"
                                        onClick={() => handleHiddenPassword(!hidden)}
                                    >
                                        {hidden ? (<VisibilityOffRounded />) : (<RemoveRedEyeRounded />)}
                                    </IconButton>
                                </Stack>
                                <div className="warn">If you forget your password, you can log in with your signed up email address </div>
                                <Button onClick={handleLogInRequest} className="sign-btn">Sign In</Button>
                                <Stack className="auth-ways">
                                    <Tooltip title="GitHub">
                                        <Button className="auth-icon">
                                            <GitHub />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Google">
                                        <Button className="auth-icon">
                                            <Google />
                                        </Button>
                                    </Tooltip>
                                </Stack>
                                {
                                    device === "mobile" ? (
                                        <Box sx={{ marginTop: "10px" }} onClick={() => toggle(false)}>
                                            Create an account
                                        </Box>
                                    ) : null
                                }
                            </Box>
                        </Box>
                        <Box className={"auth_overlay"} style={signIn ? { backgroundImage: 'url("/imgs/airballon.jpeg")' } : { transform: "translateX(-100%)", backgroundImage: 'url("/imgs/moon.jpg")' }}>
                            <Stack
                                alignItems={"center"}
                                flexDirection={"row"}
                                className={"overlay_body"}
                                style={signIn ? { transform: "translateX(-50%)" } : {}}
                            >
                                <Box className={"overlay"} style={signIn ? {} : { transform: "translate(0)" }}>
                                    <Box className="overlay_panel">
                                        <div className="left_overlay_title">Welcome Back!</div>
                                        <p>Enter your personal details and start journey with us</p>
                                        <Button onClick={() => toggle(true)}>
                                            I'm already a member
                                        </Button>
                                    </Box>
                                    <div className="overlay-wrapper"></div>
                                </Box>
                                <Box className={"righ_overlay"} style={signIn ? { transform: "translateX(0)" } : {}}>
                                    <Box className="overlay_panel">
                                        <div className="right_overlay_title ">Hello, Friend!</div>
                                        <p>To keep connected with us please login with your personal info</p>
                                        <Button onClick={() => toggle(false)}>
                                            Create an account
                                        </Button>
                                    </Box>
                                    <div className="overlay-wrapper"></div>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                    <div className="auth-overlay"></div>
                </Stack>
            </Stack>
        </Modal>
    )
}
export default AuthenticateModal