import React from "react";
import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react";
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'


const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'menu-test',
}
const verticalProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
let wrapper: RenderResult, menuElem: HTMLElement, activeElem: HTMLElement, disabledElem: HTMLElement
const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        item - 0
      </MenuItem>
      <MenuItem index={1} disabled>
        item - 1
      </MenuItem>
      <MenuItem index={2}>
        item - 2
      </MenuItem>
    </Menu>
  )
}
describe('test Menu and MenuItem component', () => {
  // 在每个钩子前先执行（钩子）
  beforeEach(() => {
    wrapper = render(GenerateMenu(testProps))
    menuElem = wrapper.getByTestId('test-menu')
    activeElem = wrapper.getByText('item - 0')
    disabledElem = wrapper.getByText('item - 1')
  })


  it('render Menu and MenuItem based on default props', () => {
    expect(menuElem).toBeInTheDocument()
    expect(menuElem).toHaveClass('menu menu-test')
    expect(menuElem.getElementsByTagName('li').length).toEqual(3)
    expect(activeElem).toHaveClass('menu-item menu-active')
    expect(disabledElem).toHaveClass('menu-item menu-disabled')
  })


  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('item - 2')

    // 元素被点击
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('menu-active')
    expect(activeElem).not.toHaveClass('menu-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    // disabled 元素无法被点击
    fireEvent.click(disabledElem)
    expect(disabledElem).not.toHaveClass('menu-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })


  it('render vertical mode when mode is set to vertical', () => {
    // 每个 case 结束会自动调用 cleanup 方法
    cleanup()
    const wrapper = render(GenerateMenu(verticalProps))
    const menuElem = wrapper.getByTestId('test-menu')
    expect(menuElem).toHaveClass('menu-vertical')
  })
})