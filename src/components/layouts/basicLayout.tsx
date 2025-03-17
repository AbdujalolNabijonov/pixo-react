import { Stack } from "@mui/material"
import React from "react"
import Navbar from "../navbar"
import Lifter from "../others/lifter"
import useDeviceDetect from "../../libs/hooks/useDeviceDetect"
import MobileNavbar from "../navbar/mobile-navbar"

const BasicLayout = (Component: React.FC) => {
    const device:string = "mobile"
    return (props: any) => {
        if (device === "mobile") {
            return (
                <Stack className="mobile-wrapper">
                    <MobileNavbar />
                    {/* <Component />
                    <Lifter /> */}
                </Stack>
            )
        } else {
            return (
                <Stack className="pc-wrapper" flexDirection={"row"}>
                    <Navbar />
                    <Component />
                    <Lifter />
                </Stack>
            )
        }
    }
}

export default BasicLayout