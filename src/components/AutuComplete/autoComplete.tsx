import { ChangeEvent, useState } from "react";
import { FC } from "react";
import Input, { InputProps } from "../Input/input";

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  onSelect?: (item: string) => void;
}

const fetchSuggesstions = (query: string) => {
  const products = [
    'MacBook Air', 'MacBook Pro', 'iMac', 'Mac Pro', 'Mac mini',
    'iPad Pro', 'iPad Air', 'iPad', 'iPad mini',
    'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
    'Apple Watch Serices 7', 'Apple Watch SE',
    'AirPods 第三代', 'AirPods Pro', 'AirPods Max'
  ]
  const res = products.filter((item) => {
    return item.toLocaleLowerCase().includes(query)
  })
  return res
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { value, onSelect } = props
  // value 如果值为 undefined，那么渲染的 Input 组件是非受控组件
  const [inputValue, setInputValue] = useState(value || '')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    if (val) {
      // 比较时英文字母用小写
      const trimAndLowerCase = val.trim().toLowerCase()
      const res = fetchSuggesstions(trimAndLowerCase)
      setSuggestions(res)
    } else {
      setSuggestions([])
    }
  }
  // 点击 li 标签自动补全 Input
  const handleClick = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    onSelect && onSelect(item)
  }
  return (
    <div className="auto-complete">
      <Input value={inputValue} onChange={handleChange} />
      <ul>
        {suggestions.map((item, idx) => {
          return (
            <li key={idx} onClick={() => handleClick(item)}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AutoComplete