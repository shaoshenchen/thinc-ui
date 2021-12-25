import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "./input";


const DefaultInput = () => (
  <Input placeholder="请输入..." />
)

const InputWithSize = () => (
  <>
    <Input size='small' />
    <Input />
    <Input size='large' />
  </>
)

const InputWithDisabled = () => (
  <>
    <Input />
    <Input placeholder="禁用中..." disabled />
  </>
)
storiesOf('Input', module)
  .add('默认 Input', DefaultInput)
  .add('不同 Size Input', InputWithSize)
  .add('Disabled Input', InputWithDisabled)