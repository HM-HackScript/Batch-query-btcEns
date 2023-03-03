import { AxiosProxyConfig } from "axios"
import { existsSync } from "fs"
import path from "path"

export const runPathRoot = existsSync(path.join(process.cwd(), './config.ini')) ?
    path.join(process.cwd(), './') :
    path.join(process.cwd(), './release')

export const sleep = async (time: number): Promise<void> => {
    return new Promise((resovle) => {
        setTimeout(() => resovle(), time * 1000)
    })
}

export const formatAxiosProxy = (proxyString?: string) => {
    if (!proxyString) return undefined
    const matchs = proxyString.match(/(\S+):\/\/(\S+):(\d+)/)
    if (!matchs) return undefined

    const proxySetting: AxiosProxyConfig = {
        protocol: matchs[1],
        host: matchs[2],
        port: Number(matchs[3])
    }

    return proxySetting
}