import { Stack } from "@mui/material"
import React from "react"
import Navbar from "../navbar"
import Lifter from "../others/lifter"

const BasicLayout = (Component: React.FC) => {
    return (props: any) => {
        const device: string = "desktop"
        if (device === "mobile") {
            return (
                <Stack className="mobile-wrapper">
                    <Component />
                    <Navbar />
                </Stack>
            )
        } else {
            return (
                <Stack className="pc-wrapper" flexDirection={'row'}>
                    <Navbar />
                    <Component />
                    <Lifter />
                </Stack>
            )
        }
    }
}

export default BasicLayout