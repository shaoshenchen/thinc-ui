import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
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
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debounceValue = useDebounce(inputValue)

  useEffect(() => {
    if (debounceValue) {
      // 将搜索关键字小写
      const formativeValue = debounceValue.trim().toLowerCase()
      const results = fetchSuggesstions(formativeValue)
      results.then(data => {
        setloading(false)
        setSuggestions(data)
      })
    } else {
      setloading(false)
      setSuggestions([])
    }
  }, [debounceValue])

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setHighlightIndex(highlightIndex - 1)
        break
      case 'ArrowDown':
        setHighlightIndex(highlightIndex + 1)
        break
      case 'Enter':
        break
      case 'Escape':
        break
      default:
        break
    }

    // 限制上下边界
    (highlightIndex < 0) && setHighlightIndex(0);
    (highlightIndex > suggestions.length - 1) && setHighlightIndex(suggestions.length - 1);

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 输入框显示的值
    const val = e.target.value
    setInputValue(val)
    setloading(true)
  }

  // 点击 li 标签自动补全 Input
  const handleClick = (item: SuggestionProps) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item.value)
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
              <h2>{item.value}</h2>
              <p>{item.id}</p>
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