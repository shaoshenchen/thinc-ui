import React from "react";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'menu-test',
}
const verticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}
let wrapper: RenderResult, menuElem: HTMLElement, activeElem: HTMLElement, disabledElem: HTMLElement
const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        item - 0
      </MenuItem>
      <MenuItem disabled>
        item - 1
      </MenuItem>
      <MenuItem>
        item - 2
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown-1</MenuItem>
        <MenuItem>dropdown-2</MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .submenu-dropdown {
      display: none;
    }
    .submenu-dropdown.open {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}
describe('test Menu and MenuItem component', () => {
  // 在每个钩子前先执行（钩子）
  beforeEach(() => {
    wrapper = render(GenerateMenu(testProps))
    wrapper.container.appendChild(createStyleFile())
    menuElem = wrapper.getByTestId('test-menu')
    activeElem = wrapper.getByText('item - 0')
    disabledElem = wrapper.getByText('item - 1')
  })


  it('render Menu and MenuItem based on default props', () => {
    expect(menuElem).toBeInTheDocument()
    expect(menuElem).toHaveClass('menu menu-test')
    expect(menuElem.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElem).toHaveClass('menu-item menu-active')
    expect(disabledElem).toHaveClass('menu-item menu-disabled')
  })


  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('item - 2')

    // 元素被点击
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('menu-active')
    expect(activeElem).not.toHaveClass('menu-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    // disabled 元素无法被点击
    fireEvent.click(disabledElem)
    expect(disabledElem).not.toHaveClass('menu-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })


  it('render vertical mode when mode is set to vertical', () => {
    // 每个 case 结束会自动调用 cleanup 方法
    cleanup()
    const wrapper = render(GenerateMenu(verticalProps))
    const menuElem = wrapper.getByTestId('test-menu')
    expect(menuElem).toHaveClass('menu-vertical')
  })


  it('show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('dropdown-1')).not.toBeVisible()
    const dropdownElem = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElem)
    // submenu 的 hover 是异步操作
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown-1')).toBeVisible()
    })

    fireEvent.click(wrapper.getByText('dropdown-2'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-1')
    fireEvent.mouseLeave(dropdownElem)
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown-2')).not.toBeVisible()
    })
  })
})