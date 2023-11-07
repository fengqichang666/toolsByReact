import { Button } from 'antd'
import React from 'react'
import {getDirectory} from '@/api/index'
function RemoteFiles() {
    // const getData = async ()=>{
         getDirectory()
    // }
    // getData()
    return (
        <>
            <a href='https://github.com/fengqichang666/filesManage' target='_blank'>去上传文件</a>
        </>
    )
}

export default RemoteFiles