import axios from "axios"
import { LoginInput } from "../libs/types/member"
import { serverApi } from "../libs/config"

class MemberService {
    server: string
    constructor() {
        this.server = serverApi
    }

    public async loginRequest(data: LoginInput) {
        try {
            const url = `${this.server}/member/login`
            const response = await axios.post(url, data, { withCredentials: true })
            const member = response.data.value;
            localStorage.setItem("member", JSON.stringify(member));
            return member
        } catch (err: any) {
            console.log(`ERROR: loginRequest, ${err.message}`)
            throw err
        }
    }
}
export default MemberService