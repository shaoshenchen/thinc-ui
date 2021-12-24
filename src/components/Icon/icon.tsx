import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";


export type ThemeProps = 'black' | 'gray' | 'blue' | 'green' | 'red'
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })

  return (
    <FontAwesomeIcon className={classes} {...restProps}/>
  )
}

export default Icon