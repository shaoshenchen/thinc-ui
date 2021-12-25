import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import AutoComplete from "./autoComplete";


const DefaultAutoComplete = () => (
  <AutoComplete onSelect={action('actions')} placeholder="GitHub 用户查询" />
)

storiesOf('AutoComplete', module)
  .add('默认 AutoComplete', DefaultAutoComplete)