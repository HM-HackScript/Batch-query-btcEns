import { formatAxiosProxy, runPathRoot } from "./utils"
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import axios from "axios"
import moment from "moment"
import ini from 'ini'

const filePath = {
    ['已注册']: path.join(runPathRoot, '已注册.txt'),
    ['未注册']: path.join(runPathRoot, '未注册.txt'),
    ['查询异常']: path.join(runPathRoot, '查询异常.txt'),
}
const { proxy, entry } = ini.parse(readFileSync(path.join(runPathRoot, 'config.ini'), 'utf-8'))
const namesPath = String(entry).trim()

const fetchStatus = async (name: string): Promise<any> => {
    return new Promise((resovle, reject) => {
        axios.get(`https://api.sats.id/names/${name}.sats`, {
            proxy: formatAxiosProxy(proxy)
        })
            .then(res => resovle(res))
            .catch(err => reject(err))
    })
}

const runMian = async () => {
    console.log(`Start: 配置文件 ${namesPath}`)
    try {
        const names = readFileSync(path.join(runPathRoot, namesPath), 'utf-8')
        const namesArr = names.split('\n')

        const registeredFile = readFileSync(filePath.已注册, 'utf-8')
        const unRegisteredFile = readFileSync(filePath.未注册, 'utf-8')

        console.log(`===== Total Count: ${namesArr.length} =====`)
        for (let index = 0; index < namesArr.length; index++) {
            const name = namesArr[index];
            const quickQueryKey = `【${name}】`

            if (registeredFile.includes(quickQueryKey)) {
                console.log(`序号: ${index + 1}\t 账号: ${name}\t 状态: 已注册\t 时间: ${moment().format('HH:mm:ss')}`)
            } else {
                try {
                    await fetchStatus(name)
                    console.log(`序号: ${index + 1}\t 账号: ${name}\t 状态: 已注册\t 时间: ${moment().format('HH:mm:ss')}`)
                    writeFileSync(path.join(runPathRoot, '已注册.txt'), `【${name}】\t`, { flag: 'a' })
                } catch (error: any) {
                    if (error.response.status === 404) {
                        console.error(`序号: ${index + 1}\t 账号: ${name}\t 状态: 未注册\t 时间: ${moment().format('HH:mm:ss')}`)
                        writeFileSync(path.join(runPathRoot, '未注册.txt'), `【${name}】\t`, { flag: 'a' })
                    } else {
                        console.error(`序号: ${index + 1}\t 账号: ${name}\t 状态: 注册异常\t 原因: ${error.response.status}-${error.message}  时间: ${moment().format('HH:mm:ss')}`)
                        writeFileSync(path.join(runPathRoot, '查询异常.txt'), `${name}\n`, { flag: 'a' })
                    }
                }
            }
        }

    } catch (error: any) {
        console.log(`运行异常：${error.message}`)
    }
}

runMian()