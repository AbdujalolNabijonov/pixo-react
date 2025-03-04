import { KeyboardDoubleArrowUp } from "@mui/icons-material"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"

const Lifter = () => {
    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        function scrollHandler() {
            setShow(window.scrollY > 300)
        }
        document.addEventListener("scroll", scrollHandler)
        return () => {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])
    const goupHandler = () => {
        window.scrollTo(0, 0)
    }
    return (
        <Box
            className="lifter"
            sx={show ? { display: "flex" } : { display: "none" }}
            onClick={goupHandler}
        >
            <KeyboardDoubleArrowUp />
        </Box>
    )
}

export default Lifter