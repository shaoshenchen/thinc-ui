import classNames from 'classnames'
import React, { FunctionComponentElement, useContext, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon';
import Transition from '../Transition/transition'

library.add(fas)
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  // 双下标处理
  const contextIndex = context.index?.includes('-') ? context.index.split('-')[0] : context.index
  const openSubMenu = context.defaultOpenSubMenu as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openSubMenu.includes(index) : false
  const [subMenuOpen, setSubMenuOpen] = useState(isOpened)
  const classes = classNames('menu-item menu-submenu', className, {
    // context.index 可能有双下标，index 一定是单下标
    'menu-active': contextIndex === index,
    'menu-selected': subMenuOpen
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubMenuOpen(!subMenuOpen)
  }
  let timer: NodeJS.Timeout
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setSubMenuOpen(toggle)
    }, 200)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu-dropdown', {
      'open': subMenuOpen
    })
    const childrenComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition
        in={subMenuOpen}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon className='angle-down' icon='angle-down' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu