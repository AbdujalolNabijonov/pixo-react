import { Pagination, Stack } from "@mui/material"
import BasicLayout from "../../components/layouts/basicLayout"
import Members from "./members"
import Posts from "./posts"
import { useEffect, useState } from "react"
import { Member, Members as MemberList } from "../../libs/types/member"
import MemberService from "../../service api/Member.service"
import { sweetErrorHandling } from "../../libs/sweetAlert"

const HomePage = (props: any) => {
    const [members, setMembers] = useState<Member[]>([])

    useEffect(() => {
        const memberService = new MemberService()
        memberService.getMembers().then((members: MemberList) => {
            setMembers(members.list)
        }).catch(err => {
            sweetErrorHandling(err).then()
        })
    }, [])

    return (
        <Stack className="home-page">
            <Stack className="container">
                <Members members={members} />
                <Posts />
                <Pagination
                    className="pagination"
                    count={10}
                    color="secondary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Stack>
    )
}

export default BasicLayout(HomePage)