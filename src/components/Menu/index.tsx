import React from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = React.FC<MenuProps> & {
  SubMenu: React.FC<SubMenuProps>,
  MenuItem: React.FC<MenuItemProps>,
}

const TransMenu = Menu as IMenuComponent

TransMenu.MenuItem = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu