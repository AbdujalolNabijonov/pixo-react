import { useContext } from "react";
import { MyContext } from "../context/context";

function useGlobal() {
    const globalItems = useContext(MyContext)
    if (!globalItems) {
        throw new Error("Context within Provider!")
    }
    return globalItems
}

export default useGlobal