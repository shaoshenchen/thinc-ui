import React, { useRef, useState } from "react"
import axios from "axios"
import Button from "../Button/button"


export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
}
const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const axiosConfig = (file: File, _file: UploadFile) => {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e: any) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    // 更新 state 是异步的过程
    setFileList((previousList) => {
      return previousList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    // 文件不存在直接返回
    if (!files) {
      return
    }
    // 文件存在，上传后清空里面的值
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + '-upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, axiosConfig(file, _file))
      .then((res) => {
        updateFileList(_file, { status: 'success', response: res.data })
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      // beforeUpload 生命周期
      if (beforeUpload) {
        const result = beforeUpload(file)
        // 返回 Promise
        if (result && result instanceof Promise) {
          result.then(item => {
            post(item)
          })
        }
        // 返回 true 或 undefined
        else if (result === true) {
          post(file)
        }
      }
      // 不经过 beforeUpload
      else {
        post(file)
      }
    })
  }

  console.log(fileList)

  return (
    <div className="upload">
      {/* 上传按钮 */}
      <input ref={fileInput} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      <Button btnType="primary" onClick={handleClick}>Upload File</Button>

      {/* 文件数组 */}
    </div>
  )
}

export default Upload