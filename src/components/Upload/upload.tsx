import React, { useRef } from "react"
import axios from "axios"
import Button from "../Button/button"


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
  const axiosConfig = (file: File) => {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e: any) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }
  }

  const handleClick = () => {
    console.log(fileInput.current);

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
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, axiosConfig(file))
      .then((res) => {
        console.log(res)
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.error(err)
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

  return (
    <div className="upload">
      <Button btnType="primary" onClick={handleClick}>Upload File</Button>
      <input ref={fileInput} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  )
}

export default Upload