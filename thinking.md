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