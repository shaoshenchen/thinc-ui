import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import AutoComplete from "./autoComplete";


const DefaultAutoComplete = () => (
  <AutoComplete onSelect={action('actions')} />
)

storiesOf('AutoComplete', module)
  .add('默认 AutoComplete', DefaultAutoComplete)