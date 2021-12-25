import React from "react";
import { storiesOf } from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const HorizontalMenu = () => (
  <Menu>
    <MenuItem>item - 0</MenuItem>
    <MenuItem disabled>item - 1</MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>down - 1</MenuItem>
      <MenuItem>down - 2</MenuItem>
    </SubMenu>
    <MenuItem>item - 2</MenuItem>
  </Menu>
)

const VerticalMenu = () => (
  <Menu mode='vertical'>
    <MenuItem>item - 0</MenuItem>
    <MenuItem disabled>item - 1</MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>down - 1</MenuItem>
      <MenuItem>down - 2</MenuItem>
    </SubMenu>
    <MenuItem>item - 2</MenuItem>
  </Menu>
)

storiesOf('Menu', module)
  .add('水平 Menu', HorizontalMenu)
  .add('垂直 Menu', VerticalMenu)