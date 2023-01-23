
## Description

Convert template files

<br/>

---



## Installation

```shell
npm install transform-template
```

<br/>

---

## Usage

```javascript
const {transformTemplate} = require("transform-template");
```

<br/>

---

## Examples

Convert a string

```javascript
const {transformTemplateString} = require("transform-template");
const str = `const someFunction = function () { const aa = "##aaaa##"; }`
const content = transformTemplateString(str, {aaaa: "Salut"});
```

---

Convert a file

```javascript
transformTemplateFiles("../demo/file1.js", {aaaa: "Hi you!"}, {});
```
---

Convert a directory

```javascript
transformTemplateFiles("../demo/", {aaaa: "Hi you!"});
```
---
## Package

```
📁 package                
│
└───📁 cjs
│   │
│   └─📝 index.cjs           ⇽ CJS version      - Browser (4.3kB unminified)

```

<br/>

---


