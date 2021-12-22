import { useEffect, useState } from "react";

function useDebounce(val: string, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(val)

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(val)
    }, delay)
    // 清除副作用
    return () => {
      clearTimeout(handler)
    }
  }, [val, delay])

  return debounceValue
}

export default useDebounce