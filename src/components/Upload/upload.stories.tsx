import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import Upload from "./upload"


const checkFileSize = (file: File) => {
  const kbLimit = 50
  if (Math.round(file.size / 1024) > kbLimit) {
    alert(`File should be limit to ${kbLimit} KB`)
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

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

storiesOf('Upload', module)
  .add('默认 Upload', UploadLifeCycle1)
  .add('beforeUpload', UploadLifeCycle2)
  .add('beforeUpload 异步', UploadLifeCycle3)