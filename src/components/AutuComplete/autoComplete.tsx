import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FC } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  value?: string;
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

  // // 异步获取
  // return fetch(`https://api.github.com/search/users?q=${query}`)
  //   .then(res => res.json())
  //   .then(res => {
  //     return res.items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
  //   })
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { value, onSelect, ...restProps } = props
  // value 如果值为 undefined，那么渲染的 Input 组件是非受控组件
  const [inputValue, setInputValue] = useState(value || '')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setloading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSelect = useRef(false)
  const debounceValue = useDebounce(inputValue)

  useEffect(() => {
    if (debounceValue && triggerSelect.current) {
      // 将搜索关键字小写
      const formativeValue = debounceValue.trim().toLowerCase()
      const results = fetchSuggesstions(formativeValue)

      // 从已知列表获取
      setloading(false)
      setSuggestions(results)

      // 异步获取
      // results.then(data => {
      //   setloading(false)
      //   setSuggestions(data)
      // })
    } else {
      setloading(false)
      setSuggestions([])
    }

    setHighlightIndex(-1)
  }, [debounceValue])

  const normalizeHighlightIndex = (idx: number) => {
    // 限制上下边界
    if (idx < 0) {
      idx = 0
    }
    if (idx > suggestions.length - 1) {
      idx = suggestions.length - 1
    }

    setHighlightIndex(idx)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        normalizeHighlightIndex(highlightIndex - 1)
        break
      case 'ArrowDown':
        normalizeHighlightIndex(highlightIndex + 1)
        break
      case 'Enter':
        handleClick(suggestions[highlightIndex])
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 输入框显示的值，不可在此修改数据
    const val = e.target.value
    setInputValue(val)
    setloading(true)
    triggerSelect.current = true
  }

  // 点击 li 标签自动补全 Input
  const handleClick = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    triggerSelect.current = false
    // 用户自定义事件
    onSelect && onSelect(item)
  }

  const showUserList = () => {
    if (loading) {
      // 加载图标
      return (
        <Icon icon='spinner' spin />
      )
    } else {
      // 渲染列表
      return (
        suggestions.map((item, idx) => {
          const classes = classNames('suggestion-item', {
            'suggestion-highlight': idx === highlightIndex
          })
          return (
            <li key={idx} onClick={() => handleClick(item)} className={classes}>
              {item}
            </li>
          )
        })
      )
    }
  }

  return (
    <div className="auto-complete">
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      <ul>
        {showUserList()}
      </ul>
    </div>
  )
}

export default AutoComplete