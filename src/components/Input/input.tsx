import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";


type InputSize = 'small' | 'large'
// Omit 剔除指定类型
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  size?: InputSize;
  disabled?: boolean;
  prepend?: IconProp | HTMLElement;
  append?: IconProp | HTMLElement;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    size,
    disabled,
    prepend,
    append,
    ...restProps
  } = props
  const classes = classNames('input', className, {
    [`input-${size}`]: size,
  })

  return (
    <>
      {prepend}
      <input type="text" className={classes} disabled={disabled} {...restProps} />
      {append}
    </>
  )
}

export default Input