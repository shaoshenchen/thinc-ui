import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import Upload from "./upload"


const DefaultUpload = () => (
  <Upload
    action="http://jsonplaceholder.typicode.com/posts"
    onProgress={action('onProgress')}
    onSuccess={action('onSuccess')}
    onError={action('onError')}
  />
)
storiesOf('Upload', module)
  .add('默认 Upload', DefaultUpload)