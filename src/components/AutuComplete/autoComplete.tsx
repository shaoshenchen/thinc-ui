import { ChangeEvent, useState } from "react";
import { FC } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  onSelect?: (item: string) => void;
}

interface SuggestionProps {
  value: string;
  id: number;
}

/**
 * 
 * @param {string} query - 搜索关键字
 * @returns {Array} list - 与 query 匹配的用户列表
 */
const fetchSuggesstions = (query: string) => {
  // 从已知列表中获取
  // const products = [
  //   'MacBook Air', 'MacBook Pro', 'iMac', 'Mac Pro', 'Mac mini',
  //   'iPad Pro', 'iPad Air', 'iPad', 'iPad mini',
  //   'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
  //   'Apple Watch Serices 7', 'Apple Watch SE',
  //   'AirPods 第三代', 'AirPods Pro', 'AirPods Max'
  // ]
  // const res = products.filter((item) => {
  //   return item.toLocaleLowerCase().includes(query)
  // })
  // return res

  // 异步获取
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(res => {
      return res.items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
    })
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { value, onSelect, ...restProps } = props
  // value 如果值为 undefined，那么渲染的 Input 组件是非受控组件
  const [inputValue, setInputValue] = useState(value || '')
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([])
  const [loading, setloading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 输入框显示的值
    const val = e.target.value
    setInputValue(val)
    setloading(true)

    if (val) {
      // 将搜索关键字小写
      const formativeValue = val.trim().toLowerCase()
      const results = fetchSuggesstions(formativeValue)
      results.then(data => {
        setloading(false)
        setSuggestions(data)
      })
    } else {
      setloading(false)
      setSuggestions([])
    }
  }
  // 点击 li 标签自动补全 Input
  const handleClick = (item: SuggestionProps) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item.value)
  }
  return (
    <div className="auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      <ul>
        {loading ?
          // 加载图标
          <Icon icon='spinner' spin/> :
          // 渲染列表
          suggestions.map((item, idx) => {
            return (
              <li key={idx} onClick={() => handleClick(item)}>
                <h2>{item.value}</h2>
                <p>{item.id}</p>
              </li>
            )
          }
          )}
      </ul>
    </div>
  )
}

export default AutoComplete