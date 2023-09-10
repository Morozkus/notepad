import { useState, useEffect } from "react";


export default function useInput(initalValue: any, cb: Function) {
    const [value, setValue] = useState(initalValue)

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value)
        cb(e)
    }

    return {value, onChange}
}

export function useInputReload(initalValue: any, cb: Function) {
    const [value, setValue] = useState(initalValue)

    useEffect(() => {
        setValue(initalValue)
    }, [initalValue])
    
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value)
        cb(e)
    }

    return {value, onChange}
}

export type InputWithReloadType = ReturnType<typeof useInputReload>