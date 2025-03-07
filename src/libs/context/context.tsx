import { createContext } from "react";
import React, { useEffect, useState } from "react"
import { Member } from "../types/member"
import Cookies from "universal-cookie"

interface Global {
    member: Member | null;
    rebuild: Date;
    setRebuild: any
}
export const MyContext = createContext<Global | undefined>(undefined)

export const GlobalContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [member, setMember] = useState<Member | null>(null)
    const [rebuild, setRebuild] = useState(new Date())
    useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("accessToken")
        if (token && localStorage.getItem("member")) {
            setMember(JSON.parse(localStorage.getItem("member") as string))
        } else if (token && !localStorage.getItem("member")) {
            cookie.remove("accessToken")
        }
    }, [])
    return (
        <MyContext.Provider value={{ member: member, rebuild, setRebuild }}>
            {children}
        </MyContext.Provider>
    )
}



