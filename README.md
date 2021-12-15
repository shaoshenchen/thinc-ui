# thinc-ui
an epic UI components library

# QA
1. How does the program base a reference without a suffix, such as `import App from './App';`.

> xxx

2. Why function components double-call in render-phase?

>  React 在 Dev Mode 下会刻意执行两次渲染，以防止组件内有什么 side effect 引起 BUG，提前预防。

3. 如何让 JSX 能够像 HTMLElement 一样通过 `document.body.append()` 插入到文档中？

*原来的想法是先创建一个空的 div1 插入到 body 末尾，在需要生成 alert 消息的时候把 JSX 用 ReactDOM.render() 方法渲染到另一个新的 div2，然后调用 document.body.append 给 div2 追加到 div1 之中。*
*不过这种方法必须在 useEffect 也就是生命周期里调用，否则会报警告，而且会产生多余的 div 标签*

> Alert 组件返回的时候用 ReactDOM.createPortal(child, target)，该函数第二个参数 target 可以指定挂载的 DOM 对象。只需在组件外部声明一个 div，就可以把 Alert 里的内容挂载到 target 上