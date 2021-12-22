import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions'
import Button from "./button";


const defaultButton = () => (
  <Button onClick={action('clicked')}> Default</Button>
)
const buttonWithSize = () => (
  <>
    <Button size="large">Large</Button>
    <Button>Normal</Button>
    <Button size="small">Small</Button>
  </>
)
const buttonWithType = () => (
  <>
    <Button btnType="primary">Primary</Button>
    <Button btnType="default">Default</Button>
    <Button btnType="dashed">Dashed</Button>
    <Button btnType="text">Text</Button>
    <Button btnType="link">Link</Button>
  </>
)

const buttonWithDisabled = () => (
  <>
    <Button disabled> Default </Button>
    <Button btnType='link' disabled> Link </Button>
  </>
)

storiesOf('Button', module)
  .add('默认 Button', defaultButton)
  .add('不同尺寸 Button', buttonWithSize)
  .add('不同类型 Button', buttonWithType)
  .add('禁用 Button', buttonWithDisabled)
