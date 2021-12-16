# 修饰符

- public

- readlyonly 只能初始化时赋值

- private 只能在类中访问，**不能**在子类中访问

- protected 只能在类中访问，**可以**在子类中访问

- static 可以直接在类上调用，不需要实例化



# 抽象类属性和方法

```ts
interface Radio {
  switchRadio(): void
}

class Car implements Radio {
  switchRadio() { }
}

class Cellphone implements Radio {
  switchRadio() { }
}
```



# 泛型

单一输入，动态确定参数类型

```ts
function echo<T>(arg: T): T { 
  return arg
}

const res: string = echo('str')
```

多个输入

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const res2 = swap(['str', 123])
```



**泛型约束**。字符串应该也有 `length` 属性

```ts
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg
}

const arrs = echoWithArr([1, 2, 3])
// Argument of type 'string' is not assignable 
// to parameter of type 'unknown[]'.
const strs = echoWithArr('abc')    // ERROR!
```

现在只要参数里有 `length` 属性就能符合约束，不管什么类型

```ts
interface WithLength {
  length: number
}

function echoWithLength<T extends WithLength>(arg: T): T {
  console.log(arg.length);
  return arg
}

const str = echoWithLength('str')
const obj = echoWithLength({ length: 10 })
const arr = echoWithLength([1, 2, 3])
// Argument of type 'number' is not assignable
// to parameter of type 'WithLength'.
const num = echoWithLength(100)    // ERROR!
```



给类定义

```ts
class Queue<T> {
  private data = []
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}

const queue = new Queue<number>()
```

给接口定义

```ts
interface KeyPair<T, U> {
  key: T,
  value: U
}

let kp1: KeyPair<number, string> = { key: 123, value: 'str' }
let kp2: KeyPair<string, number> = { key: 'test', value: 321 }
```

给函数定义

```ts
interface Plus<T> {
  (a: T, b: T): T
}

function plus(a: number, b: number): number {
  return a + b
}

function concat(a: string, b: string): string {
  return a + b
}

const res: Plus<number> = plus
const res2: Plus<string> = concat
```



# 类型别名

用在联合类型中可以简化书写

```ts
type NameResolver = () => string
type NameOrResolver = string | NameResolver

function getName(name: NameOrResolver): string {
  if (typeof name === 'string') {
    return name
  } else {
    return name()
  }
}
```



# 声明文件

当用第三方库但是代码中没有说明时

```ts
// 📁 jQuery.d.ts
declare var jQuery: (selector: string) => any

// 📁 temp.ts
jQuery('#root')
```

安装官方声明文件 `npm i --save @types/jquery`

# 组件和 HOC
- 组件：将 props 转换成 UI
- HOC：将组件转换成新组件