import axios from "axios"
import { LoginInput, Member, SignupInput } from "../libs/types/member"
import { serverApi } from "../libs/config"

class MemberService {
    server: string
    constructor() {
        this.server = serverApi
    }

    public async loginRequest(data: LoginInput): Promise<Member> {
        try {
            const url = `${this.server}/member/login`
            const response = await axios.post(url, data, { withCredentials: true })
            const member = response.data.value;
            localStorage.setItem("member", JSON.stringify(member));
            return member
        } catch (err: any) {
            console.log(`ERROR: loginRequest, ${err.response.data.message}`)
            throw err.response.data
        }
    }

    public async signupRequest(data: SignupInput): Promise<Member> {
        try {
            const url = `${this.server}/member/signup`
            const response = await axios.post(url, data, { withCredentials: true })
            const member = response.data.value;
            localStorage.setItem("member", JSON.stringify(member));
            return member
        } catch (err: any) {
            console.log(`ERROR: signupRequest, ${err.response.data.message}`)
            throw err.response.data
        }
    }
}
export default MemberService