import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'


type MenuMode = 'horizontial' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  // style?: React.CSSProperties;
  defaultOpenSubMenu?: string[];
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index?: string;
  mode?: MenuMode;
  defaultOpenSubMenu?: string[];
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    defaultOpenSubMenu,
    onSelect,
    children,
  } = props
  // 管理 menu-item 的 menu-active 状态
  const [menuItemActive, setMenuItemActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  const handleClick = (index: string) => {    
    setMenuItemActive(index)
    // 用户自定义回调
    onSelect && onSelect(index)
  }
  // 传递的 context
  const passedContext: IMenuContext = {
    index: menuItemActive || '0',
    mode,
    defaultOpenSubMenu,
    onSelect: handleClick,
  }
  // 将拿到的 children 重新渲染
  const renderChildren = () => {
    return React.Children.map(children, (item, idx) => {
      const childElem = item as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElem.type
      if (displayName === 'MenuItem' || 'SubMenu') {
        return React.cloneElement(childElem, {
          index: idx.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontial',
  defaultOpenSubMenu: [],
}

export default Menu