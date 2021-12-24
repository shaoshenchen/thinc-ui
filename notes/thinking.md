# 组件库开发流程

1. 给组件库起一个喜欢的名字
2. 确定代码目录结构，避免多层嵌套

```
   thinc-ui/
   README.md
   tsconfig.json
   package.json
   src/
    components/
      Button/
        button.tsx
        button.test.tsx
        style.scss (组件单独样式)
      ...
    styles/
      _variables.scss (全局变量以及可配置设置)
      _mixins.scss (全局 mixins)
      _functions.scss (全局 functions)
    index.tsx
```

3. 选择色彩体系
   参考 [中国传统颜色](http://zhongguose.com/)
   
   - 系统色板 —— 基础色板 + 中性色板
   - 产品色板 —— 品牌色 + 功能色板

4. 添加 normalize.css

# Button 组件需求分析

- 属性
  - 不同 Type (Primary/Default/Error)
  - 不同 Size (Normal/Small/Large)
  - Disabled 状态
- 使用方法
  
  ```html
  <Button
  type='primary'
  size='lg'
  href='?'
  className='?'
  disabled
  >
  thinc-ui Button
  </Button>
  ```

# Menu 组件需求分析

* 样式
  + 横向
  + 纵向
* 状态
  + 高亮（选中）
  + disabled（不可选中）
  + 下拉菜单

属性分析

```ts
interface MenuProps {
  activeIndex: number;
  mode: string;
  onSelect: (selectedIndex: number) => void;
  className: string;
}

interface MenuItemProps {
  index: number;
  disabled: boolean;
  className: string;
}
```

![](C:\Users\16000\AppData\Roaming\marktext\images\2021-12-16-21-51-29-image.png)

# 图标 Icon 解决方案
- 上古时期 - 雪碧图（CSS sprite）
- 近代 - Font Icon
- 现代和未来 - SVG

# SVG 优势
- 完全可控
- 即取即用

# 目前开发痛点
- create-react-app 入口文件不适合管理组件库
- 缺少行为追踪和属性调试功能

# 组件完美开发工具应有的特点
- 分开展示各个组件不同属性下的状态
- 能追踪组件的行为并且具有属性调试功能
- 可以为组件自动生成文档和属性列表

# Upload 文件生命周期
1. 选择文件
2. beforeUpload(file)
3. onProgress()
4. onChange()
5. onSuccess() | onError()
6. onRemoved()

# Fetch 的缺点（2019年）
- 只对网络请求报错，对 400、500 都当作成功的请求
- 默认不会带 cookie
- 不支持 abort，不支持超时控制
- *没有办法原生监测请求的进度