import { Member } from "./types/member"

export const serverApi = String(process.env.REACT_APP_SERVER_URL)
export const member: Member = localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member") as string) : null