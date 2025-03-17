import { Stack } from "@mui/material"
import React from "react"
import Navbar from "../navbar"
import Lifter from "../others/lifter"
import useGlobal from "../../libs/hooks/useGlobal"
import useDeviceDetect from "../../libs/hooks/useDeviceDetect"
import MobileNavbar from "../navbar/mobile-navbar"

const BasicLayout: React.FC<{ Component: React.FC }> = ({ Component }) => {
    const device = useDeviceDetect()

    return (
        <>
            {
                device === "mobile" ? (
                    <Stack className="mobile-wrapper">
                        <MobileNavbar />
                        <Component />
                        <Lifter />
                    </Stack>
                ) : (
                    <Stack className="pc-wrapper">
                        <Navbar />
                        <Component />
                        <Lifter />
                    </Stack>
                )
            }

        </>
    )
}

export default BasicLayout