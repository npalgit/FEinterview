## require/exports来源于commonjs,在node中实现
## import/export来源于ES6 Module

require是值拷贝
import是值引用

require/exports 的用法只有以下三种简单的写法：
```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

而 import/export 的写法就多种多样：
```js
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```
