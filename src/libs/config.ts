import { Member } from "./types/member"

export const serverApi = String(process.env.REACT_APP_SERVER_URL)

export const validTypes = ["image/jpg", "image/jpeg,", "image/webp"]