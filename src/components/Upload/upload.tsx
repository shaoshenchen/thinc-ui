import React, { useRef } from "react"
import axios from "axios"
import Button from "../Button/button"


export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}
const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
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

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios.post(action, formData, axiosConfig(file))
        .then((res) => {
          console.log(res)
          if (onSuccess) {
            onSuccess(res.data, file)
          }
        })
        .catch((err) => {
          console.error(err)
          if (onError) {
            onError(err, file)
          }
        })
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