import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  // style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    // style,
    children
  } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'menu-disabled': disabled,
    'menu-active': context.index === index
  })
  const handleClick = () => {
    // 给 li 设置 menu-active 类
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
    console.log(context.index, index);
    
    // 给 menu-submenu 设置 menu-active 类
    // if ()
  }

  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  index: '0'
}

MenuItem.displayName = 'MenuItem'

export default MenuItem