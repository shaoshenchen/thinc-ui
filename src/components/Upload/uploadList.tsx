import React from "react"
import Icon from "../Icon/icon"
import { UploadFile } from "./upload"
import Progress from '../Progress/progress'


interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove,
  } = props

  return (
    <ul className='upload-list'>
      {fileList.map(item => {
        return (
          <li className='upload-list-item' key={item.uid}>
            <div className='item-description'>
              {/* 文件图标 */}
              <span className={`file-icon file-icon-${item.status}`}>
                <Icon icon='file-alt' theme='gray' />
              </span>

              {/* 文件名 */}
              <span className='file-name'>
                {item.name}
              </span>

              {/* 文件状态 */}
              <span className='file-status'>
                {item.status === 'uploading' && <Icon icon='spinner' spin theme='blue' />}
                {item.status === 'success' && <Icon icon='check-circle' theme='green' />}
                {item.status === 'error' && <Icon icon='times-circle' theme='red' />}
              </span>

              {/* 删除按钮 */}
              <span className='file-actions'>
                <Icon icon='times' theme='gray' onClick={() => { onRemove(item) }} />
              </span>
            </div>

            {/* 进度条 */}
            <div className="item-progress">
              {
                item.status === 'uploading' &&
                <Progress
                  percent={item.percent || 0}
                />
              }
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList