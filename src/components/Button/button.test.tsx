import React from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonType } from './button'


const defaultProps = {
  // 创建一个被监控的模拟函数
  onClick: jest.fn()
}

const testProps = {
  btnType: ButtonType.Primary,
  className: 'klass'
}

const disabledProps = {
  disabled: true,
  onClick: jest.fn()
}
describe('Button component', () => {
  it('render a default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement

    // 是否成功渲染
    expect(element).toBeInTheDocument()
    // 非 disabled 状态
    expect(element.disabled).toBeFalsy()
    // 类检查
    expect(element).toHaveClass('btn')
    // 按钮事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })


  it('render the component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary klass')
  })


  it('render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href='http://dummyurl'>Link</Button>)
    const element = wrapper.getByText('Link')

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })


  it('render a disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})