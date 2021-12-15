# thinc-ui
an epic UI components library

# QA
1. How does the program base a reference without a suffix, such as `import App from './App';`.
> xxx

2. Why function components double-call in render-phase?
>  React 在 Dev Mode 下会刻意执行两次渲染，以防止组件内有什么 side effect 引起 BUG，提前预防。