import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import Upload, { UploadFile } from "./upload"


const checkFileSize = (file: File) => {
  const mbLimit = 2
  if (Math.round(file.size / 1024 / 1024) > mbLimit) {
    alert(`File should be limit to ${mbLimit} MB`)
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

const defaultFileList: UploadFile[] = [
  { uid: '1001', size: 1234, name: 'hello.tsx', status: 'uploading', percent: 30 },
  { uid: '1002', size: 1234, name: 'typescript.tsx', status: 'success', },
  { uid: '1003', size: 1234, name: 'react.tsx', status: 'error', },
]

const UploadLifeCycle1 = () => (
  <Upload
    action="http://jsonplaceholder.typicode.com/posts"
    onProgress={action('onProgress')}
    onSuccess={action('onSuccess')}
    onError={action('onError')}
  />
)

const UploadLifeCycle2 = () => (
  <Upload
    action="http://jsonplaceholder.typicode.com/posts"
    beforeUpload={checkFileSize}
    onChange={action('onChange')}
  />
)

const UploadLifeCycle3 = () => (
  <Upload
    action="http://jsonplaceholder.typicode.com/posts"
    beforeUpload={filePromise}
    onChange={action('onChange')}
  />
)

const UploadWithFileList = () => (
  <Upload
    action="http://jsonplaceholder.typicode.com/posts"
    defaultFileList={defaultFileList}
    onRemove={action('onRemove')}
  />
)

const CustomedUpload = () => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name='fileName'
    data={{ 'key': 'value' }}
    headers={{ "X-Powered-By": "thinc" }}
  />
)

const AcceptUpload = () => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name='fileName'
    accept='.jpg'
    multiple
  />
)

storiesOf('Upload', module)
  .add('默认 Upload', UploadLifeCycle1)
  .add('beforeUpload', UploadLifeCycle2)
  .add('beforeUpload 异步', UploadLifeCycle3)
  .add('defaultFileList', UploadWithFileList)
  .add('CustomedUpload', CustomedUpload)
  .add('AcceptUpload', AcceptUpload)