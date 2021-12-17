import classNames from 'classnames'
import React, { FunctionComponentElement, useContext, useState } from 'react'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'


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
    'menu-active': contextIndex === index
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
    // if (context.onSelect && typeof index === 'string') {
    //   context.onSelect(index)
    //   console.log(index);
    // }
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
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu