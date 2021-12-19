# thinc-ui
an epic UI components library

# TODO
- ❤ Tabs 组件

# 用到的技术
- React hook
- TypeScript
- Jest

# QA
1. How does the program base a reference without a suffix, such as `import App from './App';`.

> xxx

2. Why function components double-call in render-phase?

>  React 在 Dev Mode 下会刻意执行两次渲染，以防止组件内有什么 side effect 引起 BUG，提前预防。

3. 为什么 useEffect 有时候只会执行一次其中的代码，有时执行两次？

> useEffect 只会执行一次。具体到代码层面，我有一个需求是根据 state 显示/隐藏 Alert 组件，这个组件是通过 div 元素挂载到 body 下的。当我想要用键盘事件移除这个元素时，只需要修改 state 的值。不过我又加了一句 `div?.lastElementChild?.remove()` ，使得每次执行 useEffect 时多删了一次节点，给了我一种“好像执行两次”的**错觉**

4. 如何让 JSX 能够像 HTMLElement 一样通过 `document.body.append()` 插入到文档中？

*原来的想法是先创建一个空的 div1 插入到 body 末尾，在需要生成 alert 消息的时候把 JSX 用 ReactDOM.render() 方法渲染到另一个新的 div2，然后调用 document.body.append 给 div2 追加到 div1 之中。*
*不过这种方法必须在 useEffect 也就是生命周期里调用，否则会报警告，而且会产生多余的 div 标签*

> Alert 组件返回的时候用 ReactDOM.createPortal(child, target)，该函数第二个参数 target 可以指定挂载的 DOM 对象。只需在组件外部声明一个 div，就可以把 Alert 里的内容挂载到 target 上

5. Menu 组件中的 MenuItem 是如何实现自动设置 index 这一属性的？
> React.Children.map 可以获取元素的下标，React.cloneElement 可以将属性浅层合并到元素上。所以把 map 中的 index 传给 cloneElement 即可。

# 相关资料
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [React Transition Group](http://reactcommunity.org/react-transition-group/)